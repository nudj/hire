const request = require('../../lib/request')
const { promiseMap } = require('../lib')

function fetchPerson (person) {
  return request(`people/filter?id=${person}`)
    .then(results => results.pop())
}

module.exports.get = function (data, person) {
  data.person = fetchPerson(person)
  return promiseMap(data)
}
