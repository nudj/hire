const request = require('../../lib/request')
const { promiseMap } = require('../lib')

function createEmployee (data) {
  const method = 'post'
  return request(`employees`, { data, method })
}

function fetchEmployee (id) {
  return request(`employees/filter?id=${id}`)
    .then(results => results.pop())
}

function fetchEmployeeByPerson (person) {
  return request(`employees/filter?person=${person}`)
    .then(results => results.pop())
}

module.exports.get = function (data, id) {
  data.employee = fetchEmployee(id)
  return promiseMap(data)
}

module.exports.getByPerson = function (data, person) {
  data.employee = fetchEmployeeByPerson(person)
  return promiseMap(data)
}

module.exports.getOrCreateByPerson = function (data, person, company) {
  data.employee = fetchEmployeeByPerson(person)
    .then(employee => employee || createEmployee({company, person}))
  return promiseMap(data)
}

module.exports.post = function (data, company, person) {
  const employee = {company, person}
  data.newEmployee = createEmployee(employee)
  return promiseMap(data)
}
