const request = require('../../lib/request')
const { promiseMap } = require('@nudj/library')

function postSurveyMessage (hirer, recipients, subject, message, type) {
  const data = {
    hirer,
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

module.exports.getById = function (data, id) {
  data.surveyMessage = request(`surveyMessages/${id}`)
  return promiseMap(data)
}

module.exports.patch = function (data, id, message) {
  data.surveyMessage = patchSurveyMessage(id, message)
  return promiseMap(data)
}

module.exports.post = function (data, hirer, recipients, subject, message, type) {
  data.surveyMessage = postSurveyMessage(hirer, recipients, subject, message, type)
  return promiseMap(data)
}
