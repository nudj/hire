let request = require('../../lib/request')
let { promiseMap } = require('../lib')
let { merge } = require('../../lib')

const common = require('./common')

function fetchSentMessage (hirer, job, person) {
  return request(`externalMessages/filter?hirer=${hirer}&job=${job}&person=${person}`)
    .then(results => results.pop())
}

function fetchSentMessagesForJob (data, hirer, job) {
  return request(`externalMessages/filter?hirer=${hirer}&job=${job}`)
}

function fetchCompleteSentMessagesForJob (data, hirer, job) {
  return request(`externalMessages/filter?hirer=${hirer}&job=${job}`)
    .then(results => results.filter(result => !!result.sendMessage))
}

function saveSentMessage (data) {
  let url = 'externalMessages'
  let method = 'post'

  return fetchSentMessage(data.hirer, data.job, data.person)
    .then(result => {
      if (result) {
        url = `${url}/${result.id}`
        method = 'patch'
      }

      const options = { data, method }
      return request(url, options)
    })
}

module.exports.get = function (data, hirer, job, person) {
  return fetchSentMessage(hirer, job, person)
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

module.exports.post = function (data, message) {
  data.externalMessage = saveSentMessage(merge({
    hirer: data.hirer.id,
    job: data.job.id
  }, message))

  return promiseMap(data)
}
