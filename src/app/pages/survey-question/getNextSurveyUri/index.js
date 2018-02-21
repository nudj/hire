/* global Survey */
// @flow
const get = require('lodash/get')
const findIndex = require('lodash/findIndex')
const flatten = require('lodash/flatten')

function getNextSurveyUri (survey: Survey) {
  try {
    const section = get(survey, 'section')
    const allSections = get(survey, 'sections', [])
    const question = get(section, 'question')
    const allQuestions = flatten(allSections.map(section => get(section, 'questions')))
    const questionIndex = findIndex(allQuestions, { id: get(question, 'id') })
    const nextQuestion = get(section, `questions[${questionIndex + 1}]`)
    const baseURL = `/surveys/${get(survey, 'slug')}`

    if (nextQuestion) {
      const type = get(nextQuestion, 'type', '').toLowerCase()
      return `${baseURL}/sections/${section.id}/${type}/${nextQuestion.id}`
    }
    const sectionIndex = findIndex(allSections, { id: get(section, 'id') })
    const nextSection = allSections[sectionIndex + 1]
    return nextSection ? `${baseURL}/sections/${get(nextSection, 'id')}` : `${baseURL}/complete`
  } catch (error) {
    console.error(error)
    return null
  }
}

module.exports = getNextSurveyUri
