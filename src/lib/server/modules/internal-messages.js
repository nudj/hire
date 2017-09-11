const { promiseMap } = require('@nudj/library')

const request = require('../../lib/request')
const common = require('./common')
const people = require('./people')

function fetchSentMessages (hirer, job, recipient) {
  return request(`internalMessages/filter?hirer=${hirer}&job=${job}&recipient=${recipient}`)
}

function fetchLatestSentMessage (hirer, job, recipient) {
  return fetchSentMessages(hirer, job, recipient)
    .then(results => {
      results.sort(common.sortByModified)
      return results.pop()
    })
}

function fetchSentMessagesForJob (data, hirer, job) {
  return request(`internalMessages/filter?hirer=${hirer}&job=${job}`)
}

function saveSentMessage (hirer, job, recipients, subject, message, type) {
  const data = {hirer, job, recipients, subject, message, type}
  const url = 'internalMessages'
  const method = 'post'
  return request(url, { data, method })
}

function fetchAllRecipients (recipients) {
  return recipients.map(recipient => {
    return people.getOrCreateByEmail({}, recipient).then(result => result.person.id)
  })
}

module.exports.populateRecipients = function (data, recipients) {
  data.recipients = Promise.all(fetchAllRecipients(recipients))
  return promiseMap(data)
}

module.exports.getRecipientsEmailAdresses = function (data, recipients) {
  data.recipients = Promise.all(recipients.map(recipient => people.get({}, recipient)
    .then(result => result.person.email)))
  return promiseMap(data)
}

module.exports.get = function (data, hirer, job, recipient) {
  data.message = fetchLatestSentMessage(hirer, job, recipient)
  return promiseMap(data)
}

module.exports.getAll = function (data, hirer, job) {
  data.internalMessages = fetchSentMessagesForJob(data, hirer, job)
    .then(common.fetchAllRecipientsFromFragments)

  return promiseMap(data)
}

module.exports.getById = function (data, messageId) {
  data.internalMessage = request(`internalMessages/${messageId}`)
  return promiseMap(data)
}

module.exports.post = function (data, hirer, job, recipients, subject, message, type = 'MAILGUN') {
  data.savedMessage = saveSentMessage(hirer, job, recipients, subject, message, type)
  return promiseMap(data)
}
