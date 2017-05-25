let request = require('../../lib/request')
let { promiseMap } = require('../lib')

const common = require('./common')

function fetchSentMessage (hirerId, jobId, personId) {
  return request(`sentExternal/?hirerId=${hirerId}&jobId=${jobId}&personId=${personId}`)
    .then(results => results.pop())
}

function fetchSentMessagesForJob (data, hirerId, jobId) {
  return request(`sentExternal/?hirerId=${hirerId}&jobId=${jobId}`)
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

module.exports.post = function (hirerId, jobId, personId, sentMessage) {
  return saveSentMessage(hirerId, jobId, personId, sentMessage)
}
