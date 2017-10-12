const { promiseMap } = require('@nudj/library')

const request = require('../../lib/request')
const common = require('./common')
const people = require('./people')

function fetchSentMessages (hirer, job, recipient) {
  return request(`internalMessages/filter?hirer=${hirer}&job=${job}&recipient=${recipient}`)
}

function patchInternalMessage (id, internalMessage) {
  return request(`internalMessages/${id}`, {
    method: 'patch',
    data: internalMessage
  })
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

function fetchAllMessagesForHirer (hirer) {
  return request(`internalMessages/filter?hirer=${hirer}`)
}

function fetchLatestIncompleteMessage (hirer) {
  return fetchAllMessagesForHirer(hirer)
    .then(results => results.filter(message => !message.sent).pop())
}

function fetchCompleteInternalMessagesForJob (data, hirer, job) {
  return request(`internalMessages/filter?hirer=${hirer}&job=${job}`)
    .then(results => results.filter(result => !!result.sent))
}

function saveSentMessage (hirer, job, recipients, subject, message, type) {
  const data = {hirer, job, recipients, subject, message, type}
  const url = 'internalMessages'
  const method = 'post'
  return request(url, { data, method })
}

function fetchAllRecipients (recipients) {
  return Promise.all(recipients.map(recipient => {
    return people.getOrCreateByEmail({}, recipient).then(result => result.person.id)
  }))
}

module.exports.populateRecipients = function (data, recipients) {
  data.recipients = fetchAllRecipients(recipients)
  return promiseMap(data)
}

module.exports.getRecipientsEmailAdresses = function (data, recipients) {
  data.recipients = Promise.all(recipients.map(recipient => people.get({}, recipient)
    .then(result => result.person.email)))
  return promiseMap(data)
}

module.exports.findIncompleteMessagesForHirer = function (data, hirer) {
  data.incompleteMessage = fetchLatestIncompleteMessage(hirer)
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

module.exports.getAllComplete = function (data, hirer, job) {
  data.internalMessagesComplete = fetchCompleteInternalMessagesForJob(data, hirer, job)
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

module.exports.patch = function (data, id, internalMessage) {
  data.internalMessage = patchInternalMessage(id, internalMessage)
  return promiseMap(data)
}
