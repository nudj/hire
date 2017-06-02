let request = require('../../lib/request')
let { promiseMap } = require('../lib')

const common = require('./common')

function fetchSentMessage (hirerId, jobId, personId) {
  return request(`sentExternal/filter?hirerId=${hirerId}&jobId=${jobId}&personId=${personId}`)
    .then(results => results.pop())
}

function fetchSentMessagesForJob (data, hirerId, jobId) {
  return request(`sentExternal/filter?hirerId=${hirerId}&jobId=${jobId}`)
}

function fetchCompleteSentMessagesForJob (data, hirerId, jobId) {
  return request(`sentExternal/filter?hirerId=${hirerId}&jobId=${jobId}`)
    .then(results => results.filter(result => !!result.sentMessage.sendMessage))
}

function saveSentMessage (hirerId, jobId, personId, sentMessage) {
  const data = {hirerId, jobId, personId, sentMessage}
  let url = 'sentExternal'
  let method = 'post'

  return fetchSentMessage(hirerId, jobId, personId)
    .then(result => {
      if (result) {
        url = `${url}/${result.id}`
        method = 'put'
      }

      const options = {data, method, url}
      return request(options)
    })
}

module.exports.get = function (data, hirerId, jobId, personId) {
  return fetchSentMessage(hirerId, jobId, personId)
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

module.exports.post = function (hirerId, jobId, personId, sentMessage) {
  return saveSentMessage(hirerId, jobId, personId, sentMessage)
}
