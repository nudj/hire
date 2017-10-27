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

const fetchExternalPrismicContent = (data) => {
  data.tooltips = prismic.fetchContent(tooltipOptions)
  data.messages = prismic.fetchContent(messageOptions)
  data.dialog = prismic.fetchContent(dialogOptions).then(results => results && results[0])
  data.exitDialog = {
    title: 'Discard your draft?',
    text: 'If you leave this page, any unsent text will be discarded. Continue?',
    link: 'Discard',
    cancel: 'Cancel'
  }
  data.authenticationPromptDialog = {
    title: 'Tracking your conversations',
    text: 'Want to see their replies in here? Then we recommend syncing with Gmail.',
    link: 'Sync with Gmail',
    cancel: 'No, thanks'
  }
  return promiseMap(data)
}

const get = ({
  data,
  params,
  query,
  req
}) => {
  const messageId = params.messageId
  const gmailSent = query.gmail && query.gmail === req.session.gmailSecret

  return addDataKeyValue('tasksIncomplete', data => tasks.getIncompleteByHirerAndCompanyExposed(data.hirer.id, data.company.id))(data)
    .then(data => jobs.get(data, params.jobSlug))
    .then(data => externalMessages.getById(data, messageId))
    .then(data => network.getRecipient(data, data.externalMessage.recipient))
    .then(data => accounts.verifyGoogleAuthentication(data, data.person.id))
    .then(data => getExternalMessageProperties(data, messageId))
    .then(data => {
      if (!data.externalMessage.sendMessage && gmailSent) {
        delete req.session.gmailSecret
        return gmail.send(data, data.person.id, tags.external)
          .then(threadId => externalMessages.patch(data, data.externalMessage.id, { sendMessage: 'GMAIL', threadId }))
          .then(data => {
            throw new Redirect({
              url: `/jobs/${params.jobSlug}/external/${messageId}`
            })
          })
      }
      if (data.externalMessage.sendMessage === 'GMAIL') {
        return gmail.getThreadMessages(data, data.externalMessage.threadId, data.person.id)
      }
      return promiseMap(data)
    })
    .then(fetchExternalPrismicContent)
}

function getExternalMessageProperties (data, messageId) {
  return Promise.resolve(data)
    .then(data => {
      data.recipient = common.fetchPersonFromFragment(data.recipient.id)
      return promiseMap(data)
    })
    .then(data => jobs.getReferralForPersonAndJob(data, data.recipient.id, data.job.id))
    .then(data => {
      if (!data.referral) {
        data.referral = jobs.addReferral(data, data.job.id, data.recipient.id)
      }
      return promiseMap(data)
    })
    .then(data => externalMessages.getById(data, messageId))
    .catch(error => {
      console.log('error', error)
      throw new Error('Not found')
    })
}

const patch = ({
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

  return addDataKeyValue('tasksIncomplete', data => tasks.getIncompleteByHirerAndCompanyExposed(data.hirer.id, data.company.id))(data)
    .then(data => externalMessages.getById(data, messageId))
    .then(data => jobs.get(data, params.jobSlug))
    .then(data => accounts.verifyGoogleAuthentication(data, data.person.id))
    .then(data => network.getRecipient(data, data.externalMessage.recipient))
    .then(data => {
      const externalMessage = {
        recipient: data.recipient.id,
        composeMessage,
        selectStyle,
        selectLength
      }
      return externalMessages.patch(data, messageId, externalMessage)
    })
    .then(data => jobs.getOrCreateReferralForPersonAndJob(data, data.recipient.id, data.job.id))
    .then(data => {
      if (sendMessage === 'GMAIL' && !data.externalMessage.sendMessage) {
        req.session.gmailSecret = createHash(8)
        req.session.returnFail = `/jobs/${data.job.slug}/external/${data.externalMessage.id}`
        req.session.returnTo = `${req.session.returnFail}?gmail=${req.session.gmailSecret}`
        return gmail.send(data, data.person.id, tags.external)
          .then(threadId => externalMessages.patch(data, data.externalMessage.id, { sendMessage, threadId }))
          .then(data => gmail.getThreadMessages(data, data.externalMessage.threadId, data.person.id))
      }
      return externalMessages.patch(data, data.externalMessage.id, { sendMessage })
    })
    .then(data => {
      if (sendMessage) {
        return tasks.completeTaskByType(data, data.company.id, data.hirer.id, 'SHARE_JOBS')
      }
      return promiseMap(data)
    })
    .then(fetchExternalPrismicContent)
}

const post = ({
  data,
  params,
  body
}) => {
  const email = {
    body: body.message,
    from: `${data.person.firstName} ${data.person.lastName} <${data.person.email}>`,
    subject: body.subject,
    to: body.recipient
  }

  return gmail.sendByThread(email, data.person.id, body.thread)
    .then(response => {
      throw new Redirect({
        url: `/jobs/${params.jobSlug}/external/${params.messageId}`
      })
    })
}

module.exports = {
  get,
  post,
  patch
}
