const get = require('lodash/get')
const findIndex = require('lodash/findIndex')
const flatten = require('lodash/flatten')

function getNextSurveyUri (survey) {
  try {
    const question = get(survey, 'question')
    const allQuestions = get(survey, 'questions')
    const questionIndex = findIndex(allQuestions, { id: get(question, 'id') })
    const nextQuestion = get(survey, `questions[${questionIndex + 1}]`)
    const baseURL = `/surveys/${get(survey, 'slug')}`

    return nextQuestion ? `${baseURL}/questions/${nextQuestion.id}` : `${baseURL}/complete`
  } catch (error) {
    console.error(error)
    return null
  }
}

function getSavedSurveyQuestionConnections (questionId, surveyAnswers) {
  return flatten(surveyAnswers.filter(answer => {
    return get(answer, 'surveyQuestion.id') === questionId
  }).map(answer => answer.connections))
}

module.exports = {
  getNextSurveyUri,
  getSavedSurveyQuestionConnections
}
