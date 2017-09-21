const request = require('../../lib/request')
const { promiseMap } = require('@nudj/library')

function createEmployeeSurvey (data) {
  const method = 'post'
  return request(`employeeSurveys`, { data, method })
}

function getByEmployeeAndSurvey (employee, survey) {
  return request(`employeeSurveys/filter?employee=${employee}&survey=${survey}`)
    .then(results => results.pop())
}

function updateEmployeeSurvey (id, data) {
  const method = 'patch'
  const options = { data, method }
  return request(`employeeSurveys/${id}`, options)
}

module.exports.get = function (data, id) {
  data.employeeSurvey = request(`employeeSurveys/${id}`)
  return promiseMap(data)
}

module.exports.getByEmployeeAndSurvey = function (data, employee, survey) {
  data.employeeSurvey = getByEmployeeAndSurvey(employee, survey)
  return promiseMap(data)
}

module.exports.post = function (data, employee, survey, token) {
  const employeeSurvey = {employee, survey, token}
  data.newEmployeeSurvey = createEmployeeSurvey(employeeSurvey)
  return promiseMap(data)
}

module.exports.patch = function (data, id, input) {
  data.employeeSurvey = updateEmployeeSurvey(id, input)
  return promiseMap(data)
}
