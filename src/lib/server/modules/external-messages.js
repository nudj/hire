const {
  merge,
  promiseMap
} = require('@nudj/library')

const request = require('../../lib/request')
const common = require('./common')

function fetchSentMessages (hirer, job, recipient) {
  return request(`externalMessages/filter?hirer=${hirer}&job=${job}&recipient=${recipient}`)
}

function fetchLatestSentMessage (hirer, job, recipient) {
  return fetchSentMessages(hirer, job, recipient)
    .then(results => {
      results.sort(common.sortByModified)
      return results.pop()
    })
}

function fetchSentMessagesForJob (data, hirer, job) {
  return request(`externalMessages/filter?hirer=${hirer}&job=${job}`)
}

function fetchCompleteSentMessagesForJob (data, hirer, job) {
  return request(`externalMessages/filter?hirer=${hirer}&job=${job}`)
    .then(results => results.filter(result => !!result.sendMessage))
}

function makeMessage (hirer, job, recipient, sentMessage) {
  return merge({
    hirer: hirer.id,
    job: job.id,
    recipient: recipient.id
  }, sentMessage)
}

function saveSentMessage (hirer, job, recipient, sentMessage, id) {
  const data = makeMessage(hirer, job, recipient, sentMessage)
  let url = 'externalMessages'
  let method = 'post'

  if (id) {
    url = `${url}/${id}`
    method = 'patch'
  }

  const options = { data, method }
  return request(url, options)
}

module.exports.get = function (data, hirer, job, recipient) {
  data.message = fetchLatestSentMessage(hirer, job, recipient)
  return promiseMap(data)
}

module.exports.getAll = function (data, hirer, job) {
  data.externalMessages = fetchSentMessagesForJob(data, hirer, job)
    .then(common.fetchPeopleFromFragments)

  return promiseMap(data)
}

module.exports.getAllComplete = function (data, hirer, job) {
  data.externalMessagesComplete = fetchCompleteSentMessagesForJob(data, hirer, job)
    .then(common.fetchPeopleFromFragments)

  return promiseMap(data)
}

module.exports.patch = function (data, hirer, job, recipient, sentMessage, id) {
  data.savedMessage = saveSentMessage(hirer, job, recipient, sentMessage, id)
  return promiseMap(data)
}

module.exports.post = function (data, hirer, job, recipient, sentMessage) {
  data.savedMessage = saveSentMessage(hirer, job, recipient, sentMessage)
  return promiseMap(data)
}
