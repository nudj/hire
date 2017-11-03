const {
  promiseMap,
  addDataKeyValue
} = require('@nudj/library')
const { Redirect } = require('@nudj/framework/errors')
const createHash = require('hash-generator')

const common = require('../../server/modules/common')
const accounts = require('../../server/modules/accounts')
const jobs = require('../../server/modules/jobs')
const network = require('../../server/modules/network')
const conversations = require('../../server/modules/conversations')
const messages = require('../../server/modules/messages')
const gmail = require('../../server/modules/gmail')
const tasks = require('../../server/modules/tasks')
const externalMessages = require('../../server/modules/external-messages')
const prismic = require('../../server/lib/prismic')
const tags = require('../../lib/tags')

const dialogOptions = {
  type: 'dialog',
  tags: ['sendExternal'],
  keys: {
    title: 'dialogtitle',
    text: 'dialogtext',
    cancel: 'dialogcanceltext',
    confirm: 'dialogconfirmtext'
  }
}
const leavePageDialogOptions = {
  type: 'dialog',
  tags: ['leaveSendExternalPage'],
  keys: {
    title: 'dialogtitle',
    text: 'dialogtext',
    cancel: 'dialogcanceltext',
    link: 'dialogconfirmtext'
  }
}
const tooltipOptions = {
  type: 'tooltip',
  tags: ['sendExternal'],
  keys: {
    title: 'tooltiptitle',
    text: 'tooltiptext',
    intercom: 'tooltipintercombutton'
  }
}
const messageOptions = {
  type: 'composemessage',
  tags: ['external'],
  keys: {
    subject: 'composesubject',
    message: 'composetext'
  }
}

const fetchExternalPrismicContent = async (data) => {
  data.tooltips = await prismic.fetchContent(tooltipOptions)
  data.messages = await prismic.fetchContent(messageOptions)
  data.dialog = await prismic.fetchContent(dialogOptions).then(results => results && results[0])
  data.exitDialog = await prismic.fetchContent(leavePageDialogOptions).then(results => results && results[0])
  return promiseMap(data)
}

const getExternalMessageProperties = async (data, messageId) => {
  try {
    data.recipient = await common.fetchPersonFromFragment(data.recipient.id)
    data = await jobs.getReferralForPersonAndJob(data, data.recipient.id, data.job.id)
    if (!data.referral) {
      data = await jobs.addReferral(data, data.job.id, data.recipient.id)
    }
    return externalMessages.getById(data, messageId)
  } catch (error) {
    console.log('error', error)
    throw new Error('Not found')
  }
}

const startNewGmailConversation = async (data) => {
  const gmailResponse = await gmail.send(data, data.person.id, tags.external)
  data = await conversations.post(data, data.externalMessage.hirer, data.externalMessage.recipient, data.job.id, gmailResponse.threadId, 'GMAIL')
  data = await messages.post(data, data.conversation.id, gmailResponse.id, gmailResponse.pixelToken)
  data = await externalMessages.patch(data, data.externalMessage.id, { sendMessage: 'GMAIL', conversation: data.conversation.id })
  data = await tasks.completeTaskByType(data, data.company.id, data.hirer.id, 'SHARE_JOBS')
  throw new Redirect({
    url: `/jobs/${data.job.slug}/external/${data.externalMessage.id}`
  })
}

const get = async ({
  data,
  params,
  query,
  req
}) => {
  const messageId = params.messageId
  const gmailSent = query.gmail && query.gmail === req.session.gmailSecret

  data = await addDataKeyValue('tasksIncomplete', data => tasks.getIncompleteByHirerAndCompanyExposed(data.hirer.id, data.company.id))(data)
  data = await jobs.get(data, params.jobSlug)
  data = await externalMessages.getById(data, messageId)
  data = await network.getRecipient(data, data.externalMessage.recipient)
  data = await accounts.verifyGoogleAuthentication(data, data.person.id)
  data = await getExternalMessageProperties(data, messageId)

  if (!data.externalMessage.sendMessage && gmailSent) { // New message to be sent
    delete req.session.gmailSecret
    return startNewGmailConversation(data)
  }

  if (data.externalMessage.conversation) { // Ongoing conversation
    data = await conversations.getById(data, data.externalMessage.conversation)
    data = await messages.getByConversation(data, data.conversation.id)
    data = await fetchExternalPrismicContent(data)
    return gmail.getThreadMessages(data, data.conversation.threadId, data.person.id)
  }
  return fetchExternalPrismicContent(data)
}

const patch = async ({
  data,
  params,
  body,
  req
}) => {
  const composeMessage = body.composeMessage
  const selectStyle = body.selectStyle
  const selectLength = body.selectLength
  const sendMessage = body.sendMessage
  const messageId = params.messageId

  data = await addDataKeyValue('tasksIncomplete', data => tasks.getIncompleteByHirerAndCompanyExposed(data.hirer.id, data.company.id))(data)
  data = await externalMessages.getById(data, messageId)
  data = await jobs.get(data, params.jobSlug)
  data = await accounts.verifyGoogleAuthentication(data, data.person.id)
  data = await network.getRecipient(data, data.externalMessage.recipient)
  const externalMessage = {
    recipient: data.recipient.id,
    composeMessage,
    selectStyle,
    selectLength
  }
  data = await externalMessages.patch(data, messageId, externalMessage)
  data = await jobs.getOrCreateReferralForPersonAndJob(data, data.recipient.id, data.job.id)
  data = await fetchExternalPrismicContent(data)

  if (sendMessage === 'GMAIL' && !data.externalMessage.sendMessage) {
    req.session.gmailSecret = createHash(8)
    req.session.returnFail = `/jobs/${data.job.slug}/external/${data.externalMessage.id}`
    req.session.returnTo = `${req.session.returnFail}?gmail=${req.session.gmailSecret}`
    return startNewGmailConversation(data)
  } else {
    data = await externalMessages.patch(data, data.externalMessage.id, { sendMessage })
  }

  if (sendMessage) {
    return tasks.completeTaskByType(data, data.company.id, data.hirer.id, 'SHARE_JOBS')
  }

  return promiseMap(data)
}

const post = async ({
  data,
  params,
  body
}) => {
  const email = {
    body: body.message,
    from: `${data.person.firstName} ${data.person.lastName} <${data.person.email}>`,
    subject: body.subject,
    to: process.env.TEST_EMAIL_ADDRESS // body.recipient
  }

  await gmail.sendByThread(email, data.person.id, body.thread)
  throw new Redirect({
    url: `/jobs/${params.jobSlug}/external/${params.messageId}`
  })
}

module.exports = {
  get,
  post,
  patch
}
