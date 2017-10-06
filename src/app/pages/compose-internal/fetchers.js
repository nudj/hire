const {
  merge,
  promiseMap,
  addDataKeyValue
} = require('@nudj/library')
const {
  SuccessThenRedirect
} = require('@nudj/framework/errors')

const accounts = require('../../server/modules/accounts')
const jobs = require('../../server/modules/jobs')
const people = require('../../server/modules/people')
const employees = require('../../server/modules/employees')
const network = require('../../server/modules/network')
const gmail = require('../../server/modules/gmail')
const tasks = require('../../server/modules/tasks')
const internalMessages = require('../../server/modules/internal-messages')
const prismic = require('../../server/lib/prismic')
const tags = require('../../lib/tags')

const composeOptions = {
  type: 'composemessage',
  tags: ['internal'],
  keys: {
    subject: 'composesubject',
    message: 'composetext'
  }
}
const dialogOptions = {
  type: 'dialog',
  tags: ['sendInternal'],
  keys: {
    title: 'dialogtitle',
    text: 'dialogtext',
    cancel: 'dialogcanceltext',
    confirm: 'dialogconfirmtext'
  }
}
const tooltipOptions = {
  type: 'tooltip',
  tags: ['sendInternal'],
  keys: {
    title: 'tooltiptitle',
    text: 'tooltiptext',
    intercom: 'tooltipintercombutton'
  }
}

function fetchInternalPrismicContent (data) {
  data.compose = prismic.fetchContent(composeOptions).then(results => results && results[0])
  data.dialog = prismic.fetchContent(dialogOptions).then(results => results && results[0])
  data.tooltip = prismic.fetchContent(tooltipOptions).then(results => results && results[0])
  return promiseMap(data)
}

function internalMessageCreateAndMailUniqueLinkToRecipients (data, company, job, person, hirer, recipients, subject, template, type) {
  const sendMessages = recipients.map(recipient => internalMessageCreateAndMailUniqueLinkToRecipient(person, hirer, recipient, company, job, subject, template, type))
  data.messages = Promise.all(sendMessages)

  return promiseMap(data)
}

function internalMessageCreateAndMailUniqueLinkToRecipient (sender, hirer, recipient, company, job, subject, template, type) {
  const mailContent = {
    recipients: recipient,
    subject,
    template
  }
  const data = merge(mailContent, {
    company,
    job,
    hirer
  })
  // Find or create person from email
  // Create employee relation for this person
  // Get or create referral for this person
  // Append referral id to link
  return people.getByEmail(data, recipient)
    .then(data => employees.getOrCreateByPerson(data, data.person.id, company.id))
    .then(data => jobs.getReferralForPersonAndJob(data, data.person.id, job.id))
    .then(data => data.referral ? data : jobs.addReferral(data, job.id, data.person.id))
    .then(data => network.getRecipient(data, data.person.id))
    .then(data => people.get(data, sender.id))
    .then(data => {
      if (type === 'GMAIL') {
        return gmail.send(data, data.person.id, tags.internal)
      }
      return network.send(data, mailContent, tags.internal)
    })
}

const get = ({
  data,
  params
}) => {
  return accounts.verifyGoogleAuthentication(data, data.person.id)
  .then(data => jobs.get(data, params.jobSlug))
  .then(data => internalMessages.findIncompleteMessagesForHirer(data, data.hirer.id))
  .then(data => {
    if (data.incompleteMessage) {
      return internalMessages.getRecipientsEmailAdresses(data, data.incompleteMessage.recipients)
    }
    return promiseMap(data)
  })
  .then(fetchInternalPrismicContent)
}

const post = ({
  data,
  params,
  body,
  req
}) => {
  const recipients = body.recipients.replace(/\s/g, '').split(',')
  const {
    subject,
    template,
    type
  } = body

  return internalMessages.populateRecipients(data, recipients)
  .then(data => jobs.get(data, params.jobSlug))
  .then(data => internalMessages.post(data, data.hirer.id, data.job.id, data.recipients, subject, template))
  .then(data => {
    req.session.returnTo = `/jobs/${params.jobSlug}/internal/${data.savedMessage.id}`
    req.session.returnFail = `/jobs/${params.jobSlug}/internal`
    return internalMessageCreateAndMailUniqueLinkToRecipients(data, data.company, data.job, data.person, data.hirer, recipients, subject, template, type)
  })
  .then(data => {
    if (data.messages) {
      // successful send
      return tasks.completeTaskByType(data, data.company.id, data.hirer.id, 'SHARE_JOBS')
        .then((data) => internalMessages.patch(data, data.savedMessage.id, { sent: true, type }))
        .then(() => {
          throw new SuccessThenRedirect('That’s the way, aha aha, I like it! 🎉', `/jobs/${params.jobSlug}`)
        })
    }
    return fetchInternalPrismicContent(data)
  })
}

const getMessage = ({
  data,
  params,
  req
}) => {
  return internalMessages.getById(data, params.messageId)
  .then(data => jobs.get(data, params.jobSlug))
  .then(data => internalMessages.getRecipientsEmailAdresses(data, data.internalMessage.recipients))
  .then(data => {
    const { subject, message } = data.internalMessage
    req.session.returnFail = `/jobs/${params.jobSlug}/internal`
    return internalMessageCreateAndMailUniqueLinkToRecipients(data, data.company, data.job, data.person, data.hirer, data.recipients, subject, message, 'GMAIL')
  })
  .then(data => {
    if (data.messages) {
      // successful send
      return tasks.completeTaskByType(data, data.company.id, data.hirer.id, 'SHARE_JOBS')
        .then(data => internalMessages.patch(data, data.internalMessage.id, { sent: true, type: 'GMAIL' }))
        .then(() => {
          throw new SuccessThenRedirect('That’s the way, aha aha, I like it! 🎉', `/jobs/${params.jobSlug}`)
        })
    }
    return fetchInternalPrismicContent(data)
  })
}

const patchMessage = ({
  data,
  params,
  req
}) => {
  const { subject, template, type } = body

  return internalMessages.getById(data, params.messageId)
    .then(data => jobs.get(data, params.jobSlug))
    .then(data => internalMessages.getRecipientsEmailAdresses(data, data.internalMessage.recipients))
    .then(data => internalMessages.patch(data, params.messageId, { subject, message: template, recipients: data.internalMessage.recipients }))
    .then(data => {
      const { subject, message } = data.internalMessage
      req.session.returnTo = `/jobs/${params.jobSlug}/internal/${data.internalMessage.id}`
      req.session.returnFail = `/jobs/${params.jobSlug}/internal`
      return internalMessageCreateAndMailUniqueLinkToRecipients(data, data.company, data.job, data.person, data.hirer, data.recipients, subject, message, type)
    })
    .then(data => {
      if (data.messages) {
        // successful send
        return tasks.completeTaskByType(data, data.company.id, data.hirer.id, 'SHARE_JOBS')
          .then((data) => internalMessages.patch(data, data.internalMessage.id, { sent: true, type }))
          .then(() => {
            throw new SuccessThenRedirect('That’s the way, aha aha, I like it! 🎉', `/jobs/${params.jobSlug}`)
          })
      }
      return fetchInternalPrismicContent(data)
    })
}

module.exports = {
  get,
  post,
  getMessage,
  patchMessage
}
