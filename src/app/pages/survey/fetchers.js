const {
  merge,
  promiseMap,
  addDataKeyValue
} = require('@nudj/library')
const isEqual = require('lodash/isEqual')

const employees = require('../../server/modules/employees')
const tasks = require('../../server/modules/tasks')
const surveys = require('../../server/modules/surveys')
const employeeSurveys = require('../../server/modules/employee-surveys')
const tokens = require('../../server/modules/tokens')
const prismic = require('../../server/lib/prismic')
const {surveyTypes} = require('../../lib/constants')

const tooltipOptions = {
  type: 'tooltip',
  tags: ['hirerSurvey'],
  keys: {
    title: 'tooltiptitle',
    text: 'tooltiptext',
    intercom: 'tooltipintercombutton'
  }
}

const dialogOptions = {
  type: 'dialog',
  tags: ['hirerSurvey'],
  keys: {
    title: 'dialogtitle',
    text: 'dialogtext',
    cancel: 'dialogcanceltext',
    link: 'dialogconfirmtext'
  }
}

function fetchPrismicContent (data) {
  data.tooltip = prismic.fetchContent(tooltipOptions).then(results => results && results[0])
  data.dialog = prismic.fetchContent(dialogOptions).then(results => results && results[0])
  return promiseMap(data)
}

const get = ({
  data
}) => {
  return addDataKeyValue('tasksIncomplete', data => tasks.getIncompleteByHirerAndCompanyExposed(data.hirer.id, data.company.id))(data)
    .then(data => employees.getOrCreateByPerson(data, data.person.id, data.company.id))
    .then(data => surveys.getSurveyForCompany(data, surveyTypes.HIRER_SURVEY))
    .then(data => {
      data.employeeSurvey = getOrCreateEmployeeSurvey(data.employee.id, data.survey.id)
      return promiseMap(data)
    })
    .then(data => {
      const tokenData = {
        employeeSurvey: data.employeeSurvey.id
      }
      const tokenType = 'SURVEY_TYPEFORM_COMPLETE'
      data.token = getOrCreateTokenByTokenData(tokenType, tokenData)
      return promiseMap(data)
    })
    .then(data => {
      const token = data.token
      const link = `${data.survey.link}?token=${token.token}`
      data.survey = merge(data.survey, {link})
      return promiseMap(data)
    })
    .then(fetchPrismicContent)
}

function getOrCreateTokenByTokenData (tokenType, tokenData) {
  return tokens.getByType({}, tokenType)
    .then(dataTemp => dataTemp.tokens.find(token => token.data && isEqual(token.data, tokenData)))
    .then(token => {
      return token || tokens.post({}, tokenType, tokenData)
        .then(dataTemp => dataTemp.newToken)
    })
}

function getOrCreateEmployeeSurvey (employee, survey) {
  return employeeSurveys.getByEmployeeAndSurvey({}, employee, survey)
    .then(tempData => {
      if (tempData.employeeSurvey) {
        return tempData.employeeSurvey
      }
      return employeeSurveys.post({}, employee, survey)
        .then(tempData => tempData.newEmployeeSurvey)
    })
}

module.exports = {
  get
}
