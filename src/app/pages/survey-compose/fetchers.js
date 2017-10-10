const {
  merge,
  promiseMap,
  addDataKeyValue
} = require('@nudj/library')
const { Redirect } = require('@nudj/framework/errors')

const accounts = require('../../server/modules/accounts')
const jobs = require('../../server/modules/jobs')
const people = require('../../server/modules/people')
const employees = require('../../server/modules/employees')
const network = require('../../server/modules/network')
const gmail = require('../../server/modules/gmail')
const tasks = require('../../server/modules/tasks')
const internalMessages = require('../../server/modules/internal-messages')
const surveys = require('../../server/modules/surveys')
const surveyMessages = require('../../server/modules/survey-messages')
const employeeSurveys = require('../../server/modules/employee-surveys')
const tokens = require('../../server/modules/tokens')
const prismic = require('../../server/lib/prismic')
const tags = require('../../lib/tags')
const intercom = require('../../lib/intercom')

const composeOptions = {
  type: 'composemessage',
  tags: ['survey'],
  keys: {
    subject: 'composesubject',
    message: 'composetext'
  }
}
const dialogOptions = {
  type: 'dialog',
  tags: ['survey'],
  keys: {
    title: 'dialogtitle',
    text: 'dialogtext',
    cancel: 'dialogcanceltext',
    confirm: 'dialogconfirmtext'
  }
}
const tooltipOptions = {
  type: 'tooltip',
  tags: ['survey'],
  keys: {
    title: 'tooltiptitle',
    text: 'tooltiptext',
    intercom: 'tooltipintercombutton'
  }
}

function fetchSurveyPrismicContent (data) {
  data.compose = prismic.fetchContent(composeOptions).then(results => results && results[0])
  data.dialog = prismic.fetchContent(dialogOptions).then(results => results && results[0])
  data.tooltip = prismic.fetchContent(tooltipOptions).then(results => results && results[0])
  return promiseMap(data)
}

const get = ({
  data
}) => {
  return accounts.verifyGoogleAuthentication(data, data.person.id)
    .then(surveys.getSurveyForCompany)
    .then(data => surveyMessages.findIncompleteSurveyMessagesForHirer(data, data.hirer.id))
    .then(data => {
      if (data.incompleteSurveyMessage) {
        return surveyMessages.getRecipientsEmailAdresses(data, data.incompleteSurveyMessage.recipients)
      }
      return promiseMap(data)
    })
    .then(fetchSurveyPrismicContent)
}

const post = ({
  data,
  body,
  req
}) => {
  const taskType = 'SEND_SURVEY_INTERNAL'
  const eventName = 'Survey sent'
  const { subject, template, type } = body
  const recipients = body.recipients.replace(/\s/g, '').split(',')

  return surveys.getSurveyForCompany(data)
    .then(data => surveyMessages.populateRecipients(data, recipients))
    .then(data => surveyMessages.post(data, data.hirer.id, data.survey.id, data.recipients, subject, template, type))
    .then(data => {
      req.session.returnTo = `/send-survey/${data.surveyMessage.id}`
      req.session.returnFail = `/send-survey`
      return promiseMap(data)
    })
    .then(data => surveyCreateAndMailUniqueLinkToRecipients(data, recipients, subject, template, type))
    .then(data => surveyMessages.patch(data, data.surveyMessage.id, {sent: true}))
    .then(data => tasks.completeTaskByType(data, data.company.id, data.hirer.id, taskType))
    .then(data => {
      if (data.messages && data.messages.length) {
        // successful send
        return intercom.logEvent({
          event_name: eventName,
          email: data.person.email,
          metadata: {
            category: 'onboarding'
          }
        })
        .then(() => {
          throw new Redirect({
            url: '/',
            notification: {
              type: 'success',
              message: 'Great job! We’ll be in touch as soon as we hear back from your team.'
            }
          })
        })
      }
      return data
    })
    .then(fetchSurveyPrismicContent)
}

function surveyCreateAndMailUniqueLinkToRecipient (sender, recipient, company, subject, template, type, survey) {
  const recipients = recipient
  const mailContent = {recipients, subject, template}

  // Find person from email
  // Create employee relation for this person
  // Create token for `SURVEY_TYPEFORM_COMPLETE`
  // Append token to link
  return people.getOrCreateByEmail(mailContent, recipient)
    .then(data => employees.getOrCreateByPerson(data, data.person.id, company.id))
    .then(data => employeeSurveys.post(data, data.employee.id, survey.id))
    .then(data => network.getRecipient(data, data.employee.person))
    .then(data => {
      const tokenData = {
        employeeSurvey: data.newEmployeeSurvey.id
      }
      const tokenType = 'SURVEY_TYPEFORM_COMPLETE'
      return tokens.post(data, tokenType, tokenData)
    })
    .then(data => {
      const token = data.newToken
      const link = `${survey.link}?token=${token.token}`
      data.survey = merge({}, survey, {link})
      data.person = sender
      return promiseMap(data)
    })
    .then(data => {
      data.web = {
        hostname: process.env.WEB_HOSTNAME
      }
      if (type === 'GMAIL') {
        return gmail.send(data, data.person.id, tags.survey)
      }
      return network.send(data, mailContent, tags.survey)
    })
}

function surveyCreateAndMailUniqueLinkToRecipients (data, recipients, subject, template, type) {
  const company = data.company
  const survey = data.survey

  const sendMessages = recipients.map(recipient => surveyCreateAndMailUniqueLinkToRecipient(data.person, recipient, company, subject, template, type, survey))

  data.messages = Promise.all(sendMessages)
    .then(messageResults => [].concat.apply([], messageResults || []))

  return promiseMap(data)
}

const getMessage = ({
  data,
  params
}) => {
  const taskType = 'SEND_SURVEY_INTERNAL'
  const eventName = 'Survey sent'

  return surveys.getSurveyForCompany(data)
    .then(data => surveyMessages.getById(data, params.messageId))
    .then(data => surveyMessages.getRecipientsEmailAdresses(data, data.surveyMessage.recipients))
    .then(data => {
      const { subject, message, type } = data.surveyMessage
      if (data.surveyMessage.sent) {
        throw new Redirect({
          url: '/send-survey',
          notification: {
            type: 'error',
            message: 'You\'ve already sent this message.'
          }
        })
      }
      return surveyCreateAndMailUniqueLinkToRecipients(data, data.recipients, subject, message, type)
    })
    .then(data => surveyMessages.patch(data, data.surveyMessage.id, {sent: true}))
    .then(data => tasks.completeTaskByType(data, data.company.id, data.hirer.id, taskType))
    .then(data => {
      if (data.messages && data.messages.length) {
        // successful send
        return intercom.logEvent({
          event_name: eventName,
          email: data.person.email,
          metadata: {
            category: 'onboarding'
          }
        })
        .then(() => {
          throw new Redirect({
            url: '/',
            notification: {
              type: 'success',
              message: 'Great job! We’ll be in touch as soon as we hear back from your team.'
            }
          })
        })
      }
      return data
    })
    .then(fetchSurveyPrismicContent)
}

const patchMessage = ({
  data,
  params,
  body
}) => {
  const { subject, template, type } = body

  return surveyMessages.getById(data, params.messageId)
    .then(data => surveys.getSurveyForCompany(data))
    .then(data => jobs.get(data, params.jobSlug))
    .then(data => surveyMessages.getRecipientsEmailAdresses(data, data.surveyMessage.recipients))
    .then(data => surveyMessages.patch(data, params.messageId, { subject, message: template, recipients: data.surveyMessage.recipients }))
    .then(data => {
      const { subject, message } = data.surveyMessage
      req.session.returnTo = `/send-survey/${data.surveyMessage.id}`
      req.session.returnFail = `/send-survey`
      return surveyCreateAndMailUniqueLinkToRecipients(data, data.recipients, subject, message, type)
    })
    .then(data => {
      if (data.messages) {
        // successful send
        return tasks.completeTaskByType(data, data.company.id, data.hirer.id, 'SHARE_JOBS')
          .then((data) => surveyMessages.patch(data, data.surveyMessage.id, { sent: true, type }))
          .then(() => {
            throw new Redirect({
              url: '/',
              notification: {
                type: 'success',
                message: 'Great job! We’ll be in touch as soon as we hear back from your team.'
              }
            })
          })
      }
      return data
    })
    .then(fetchInternalPrismicContent)
}

module.exports = {
  get,
  post,
  getMessage,
  patchMessage
}
