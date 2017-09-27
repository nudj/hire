const request = require('../../lib/request')
const { promiseMap } = require('@nudj/library')

module.exports.getSurveyForCompany = function (data, type = 'EMPLOYEE_SURVEY') {
  data.survey = request(`surveys/filter?type=${type}&company=${data.company.id}`)
    .then(results => results.pop())
  return promiseMap(data)
}
