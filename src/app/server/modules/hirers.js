const request = require('../../lib/request')
const { promiseMap } = require('@nudj/library')

function fetchHirersByCompany (company) {
  return request(`hirers/filter?company=${company}`)
    .then(results => results || [])
}

module.exports.getAllByCompany = function (data, company) {
  data.hirers = fetchHirersByCompany(company)
  return promiseMap(data)
}