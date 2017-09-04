const request = require('../../lib/request')
const { promiseMap } = require('@nudj/library')

module.exports.getSurveyForCompany = function (data) {
  data.survey = request(`surveys/filter?company=${data.company.id}`).then(surveys => surveys[0])
  return promiseMap(data)
}
