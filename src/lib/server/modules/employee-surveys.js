const request = require('../../lib/request')
const { promiseMap } = require('@nudj/library')

function createEmployeeSurvey (data) {
  const method = 'post'
  return request(`employeeSurveys`, { data, method })
}

module.exports.get = function (data, id) {
  data.employeeSurvey = request(`employeeSurveys/${id}`)
  return promiseMap(data)
}

module.exports.post = function (data, employee, survey, token) {
  const employeeSurvey = {employee, survey, token}
  data.newEmployeeSurvey = createEmployeeSurvey(employeeSurvey)
  return promiseMap(data)
}
