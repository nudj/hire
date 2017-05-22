let request = require('../../lib/request')
let { promiseMap } = require('../lib')

const common = require('./common')

function fetchNetworkForJob (data, hirerId, jobId) {
  data.network = request(`recommendations/?hirerId=${hirerId}&jobId=${jobId}&source=hirer`)
    .then(common.fetchPeopleFromFragments)

  data.nudjNetwork = request(`recommendations/?hirerId=${hirerId}&jobId=${jobId}&source=nudj`)
    .then(common.fetchPeopleFromFragments)

  data.sentExternal = request(`sentExternal/?hirerId=${hirerId}&jobId=${jobId}`)
    .then(common.fetchPeopleFromFragments)

  return promiseMap(data)
}

function fetchNetwork (data, hirerId, jobId) {
  data.network = request(`recommendations/?hirerId=${hirerId}`)
    .then(common.fetchPeopleFromFragments)
  return promiseMap(data)
}

module.exports.get = function (data, hirerId, jobId) {
  return fetchNetworkForJob(data, hirerId, jobId)
}

module.exports.getAll = function (data, hirerId) {
  return fetchNetwork(data, hirerId)
}
