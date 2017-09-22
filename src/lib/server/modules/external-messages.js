const {
  merge,
  promiseMap
} = require('@nudj/library')

const request = require('../../lib/request')
const common = require('./common')

function fetchExternalMessages (hirer, job, recipient) {
  return request(`externalMessages/filter?hirer=${hirer}&job=${job}&recipient=${recipient}`)
}

function fetchLatestExternalMessage (hirer, job, recipient) {
  return fetchExternalMessages(hirer, job, recipient)
    .then(results => {
      results.sort(common.sortByModified)
      return results.pop()
    })
}

function fetchExternalMessagesForJob (data, hirer, job) {
  return request(`externalMessages/filter?hirer=${hirer}&job=${job}`)
}

function fetchCompleteExternalMessagesForJob (data, hirer, job) {
  return request(`externalMessages/filter?hirer=${hirer}&job=${job}`)
    .then(results => results.filter(result => !!result.sendMessage))
}

function fetchIncompleteExternalMessagesForJob (data, hirer, job) {
  return request(`externalMessages/filter?hirer=${hirer}&job=${job}`)
    .then(results => results.filter(result => !result.sendMessage))
}

function postExternalMessage (hirer, job, recipient) {
  const data = merge({
    hirer: hirer.id,
    job: job.id,
    recipient
  })

  return request('externalMessages', {
    method: 'post',
    data
  })
}

function patchExternalMessage (id, externalMessage) {
  return request(`externalMessages/${id}`, {
    method: 'patch',
    data: externalMessage
  })
}

module.exports.get = function (data, hirer, job, recipient) {
  data.externalMessage = fetchLatestExternalMessage(hirer, job, recipient)
  return promiseMap(data)
}

module.exports.getAll = function (data, hirer, job) {
  data.externalMessages = fetchExternalMessagesForJob(data, hirer, job)
    .then(common.fetchPeopleFromFragments)

  return promiseMap(data)
}

module.exports.getById = function (data, id) {
  data.externalMessage = request(`externalMessages/${id}`)
  return promiseMap(data)
}

module.exports.getAllComplete = function (data, hirer, job) {
  data.externalMessagesComplete = fetchCompleteExternalMessagesForJob(data, hirer, job)
    .then(common.fetchPeopleFromFragments)

  return promiseMap(data)
}

module.exports.getAllIncomplete = function (data, hirer, job) {
  data.externalMessagesIncomplete = fetchIncompleteExternalMessagesForJob(data, hirer, job)
  return promiseMap(data)
}

module.exports.patch = function (data, id, externalMessage) {
  data.externalMessage = patchExternalMessage(id, externalMessage)
  return promiseMap(data)
}

module.exports.post = function (data, hirer, job, recipient) {
  data.externalMessage = postExternalMessage(hirer, job, recipient)
  return promiseMap(data)
}
