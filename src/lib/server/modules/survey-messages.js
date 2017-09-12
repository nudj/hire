const request = require('../../lib/request')
const people = require('./people')
const { promiseMap } = require('@nudj/library')

function postSurveyMessage (hirer, survey, recipients, subject, message, type) {
  const data = {
    hirer,
    survey,
    recipients,
    subject,
    message,
    type
  }
  const method = 'post'

  return request('surveyMessages', { method, data })
}

function patchSurveyMessage (id, message) {
  return request(`surveyMessages/${id}`, {
    method: 'patch',
    data: message
  })
}

function fetchAllRecipients (recipients) {
  return Promise.all(recipients.map(recipient => {
    return people.getOrCreateByEmail({}, recipient).then(result => result.person.id)
  }))
}

function fetchEmailAdressesFromRecipients (recipients) {
  return recipients.map(recipient => {
    return people.get({}, recipient).then(result => result.person.email)
  })
}

module.exports.getById = function (data, id) {
  data.surveyMessage = request(`surveyMessages/${id}`)
  return promiseMap(data)
}

module.exports.patch = function (data, id, message) {
  data.surveyMessage = patchSurveyMessage(id, message)
  return promiseMap(data)
}

module.exports.post = function (data, hirer, survey, recipients, subject, message, type) {
  data.surveyMessage = postSurveyMessage(hirer, survey, recipients, subject, message, type)
  return promiseMap(data)
}

module.exports.populateRecipients = function (data, recipients) {
  data.recipients = fetchAllRecipients(recipients)
  return promiseMap(data)
}

module.exports.getRecipientsEmailAdresses = function (data, recipients) {
  data.recipients = Promise.all(fetchEmailAdressesFromRecipients(recipients))
  return promiseMap(data)
}
