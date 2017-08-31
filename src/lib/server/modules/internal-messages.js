const { promiseMap } = require('@nudj/library')

const request = require('../../lib/request')
const common = require('./common')

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

function saveSentMessage (hirer, job, recipient, subject, message) {
  const data = {hirer, job, recipient, subject, message}
  const url = 'internalMessages'
  const method = 'post'
  return request(url, { data, method })
}

module.exports.get = function (data, hirer, job, recipient) {
  data.message = fetchLatestSentMessage(hirer, job, recipient)
  return promiseMap(data)
}

module.exports.getAll = function (data, hirer, job) {
  data.internalMessages = fetchSentMessagesForJob(data, hirer, job)
    .then(common.fetchPeopleFromFragments)

  return promiseMap(data)
}

module.exports.post = function (data, hirer, job, recipient, subject, message) {
  data.savedMessage = saveSentMessage(hirer, job, recipient, subject, message)
  return promiseMap(data)
}
