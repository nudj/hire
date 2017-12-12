/* global Survey */
// @flow
const get = require('lodash/get')
const findIndex = require('lodash/findIndex')
const flatten = require('lodash/flatten')

function getNextSurveyUri (survey: Survey) {
  const section = get(survey, 'section')
  const allSections = get(survey, 'sections', [])
  const question = get(section, 'question')
  const allQuestions = flatten(allSections.map(section => section.questions))
  const questionIndex = findIndex(allQuestions, { id: question.id })
  const nextQuestion = section.questions[questionIndex + 1]
  const baseURL = `/surveys/${get(survey, 'slug')}`

  if (nextQuestion) {
    const type = nextQuestion.type.toLowerCase()
    return `${baseURL}/sections/${section.id}/${type}/${nextQuestion.id}`
  }
  const sectionIndex = findIndex(allSections, { id: section.id })
  const nextSection = allSections[sectionIndex + 1]
  return nextSection ? `${baseURL}/sections/${nextSection.id}` : `${baseURL}/complete`
}

module.exports = getNextSurveyUri
