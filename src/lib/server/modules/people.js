const request = require('../../lib/request')
const { promiseMap } = require('../lib')

function fetchPerson (person) {
  return request(`people/filter?id=${person}`)
    .then(results => results.pop())
}

function fetchPersonByEmail (email) {
  return request(`people/filter?email=${email}`)
    .then(results => results.pop())
}

function savePerson (data) {
  const method = 'post'
  return request('people', { data, method })
}

module.exports.get = function (data, person) {
  data.person = fetchPerson(person)
  return promiseMap(data)
}

module.exports.getByEmail = function (data, email) {
  data.person = fetchPersonByEmail(email)
  return promiseMap(data)
}

module.exports.getOrCreateByEmail = function (data, email) {
  data.person = fetchPersonByEmail(email)
    .then(person => person || savePerson({email}))
  return promiseMap(data)
}

module.exports.post = function (data, person) {
  data.newPerson = savePerson(person)
  return promiseMap(data)
}
