const get = require('lodash/get')
const flatten = require('lodash/flatten')

const getSavedSurveyQuestionConnections = (questionId, surveyAnswers) =>
  flatten(
    surveyAnswers.filter(answer => {
      return get(answer, 'surveyQuestion.id') === questionId
    }).map(answer => answer.connections.map(connection => connection.id))
  )

module.exports = getSavedSurveyQuestionConnections
