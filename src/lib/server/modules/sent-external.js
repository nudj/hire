let request = require('../../lib/request')
let { promiseMap } = require('../lib')

const isAfter = require('date-fns/is_after')

const common = require('./common')

function fetchSentMessages (hirerId, jobId, personId) {
  return request(`sentExternal/filter?hirerId=${hirerId}&jobId=${jobId}&personId=${personId}`)
}

function fetchLatestSentMessage (hirerId, jobId, personId) {
  return fetchSentMessages(hirerId, jobId, personId)
    .then(results => {
      results.sort((a, b) => isAfter(a.modified, b.modified) ? 1 : -1)
      return results.pop()
    })
}

function fetchSentMessagesForJob (data, hirerId, jobId) {
  return request(`sentExternal/filter?hirerId=${hirerId}&jobId=${jobId}`)
}

function fetchCompleteSentMessagesForJob (data, hirerId, jobId) {
  return request(`sentExternal/filter?hirerId=${hirerId}&jobId=${jobId}`)
    .then(results => results.filter(result => !!result.sentMessage.sendMessage))
}

function saveSentMessage (hirerId, jobId, personId, sentMessage, forced = false) {
  const data = {hirerId, jobId, personId, sentMessage}
  let url = 'sentExternal'
  let method = 'post'

  return fetchLatestSentMessage(hirerId, jobId, personId)
    .then(result => {
      if (result && !forced) {
        url = `${url}/${result.id}`
        method = 'patch'
      }

      const options = { data, method }
      return request(url, options)
    })
}

module.exports.get = function (data, hirerId, jobId, personId) {
  return fetchLatestSentMessage(hirerId, jobId, personId)
    .then(result => (result && result.sentMessage) ? result.sentMessage : result)
}

module.exports.getAll = function (data, hirerId, jobId) {
  data.sentExternal = fetchSentMessagesForJob(data, hirerId, jobId)
    .then(common.fetchPeopleFromFragments)

  return promiseMap(data)
}

module.exports.getAllComplete = function (data, hirerId, jobId) {
  data.sentExternalComplete = fetchCompleteSentMessagesForJob(data, hirerId, jobId)
    .then(common.fetchPeopleFromFragments)

  return promiseMap(data)
}

module.exports.post = function (hirerId, jobId, personId, sentMessage, forced = false) {
  return saveSentMessage(hirerId, jobId, personId, sentMessage, forced)
}
