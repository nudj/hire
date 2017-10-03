const {
  promiseMap,
  addDataKeyValue
} = require('@nudj/library')
const {
  SuccessThenRedirect
} = require('@nudj/framework/errors')

const accounts = require('../../server/modules/accounts')
const jobs = require('../../server/modules/jobs')
const internalMessages = require('../../server/modules/internal-messages')
const prismic = require('../../server/lib/prismic')

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
  data.compose = prismic.fetchContent(composeOptions).then(results => results[0])
  data.dialog = prismic.fetchContent(dialogOptions).then(results => results[0])
  data.tooltip = prismic.fetchContent(tooltipOptions).then(results => results[0])
  return promiseMap(data)
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
  const recipients = req.body.recipients.replace(/\s/g, '').split(',')
  const {
    subject,
    template,
    type
  } = req.body

  return internalMessages.populateRecipients(data, recipients)
  .then(data => jobs.get(data, params.jobSlug))
  .then(data => internalMessages.post(data, data.hirer.id, data.job.id, data.recipients, subject, template))
  .then(data => {
    req.session.returnTo = `/jobs/${params.jobSlug}/internal/${data.savedMessage.id}`
    req.session.returnFail = `/jobs/${params.jobSlug}/internal/`
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

module.exports = {
  get,
  post
}
