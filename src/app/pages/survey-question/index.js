const React = require('react')
const get = require('lodash/get')
const findIndex = require('lodash/findIndex')
const flatten = require('lodash/flatten')

const getNextSurveyUri = require('./getNextSurveyUri')
const CompanyQuestionPage = require('./company-question')
const ConnectionsQuestionPage = require('./connections-question')
const { questionTypes } = require('../../lib/constants')

const SurveyQuestionPage = props => {
  const {
    user,
    dispatch,
    surveyQuestionPage: state
  } = props
  const survey = get(user, 'hirer.company.survey')
  const nextUri = getNextSurveyUri(survey)
  const section = get(survey, 'section')
  const allSections = get(survey, 'sections', [])
  const question = get(section, 'question')
  const questions = flatten(allSections.map(section => section.questions))
  const questionIndex = findIndex(questions, { id: question.id })
  const formerEmployers = get(user, 'formerEmployers', [])
  const companiesAdded = formerEmployers.concat(
    get(user, 'newFormerEmployer', [])
  )

  switch (question.type) {
    case questionTypes.COMPANIES:
      return (
        <CompanyQuestionPage
          question={question}
          questionNumber={questionIndex + 1}
          questionCount={questions.length}
          companies={companiesAdded}
          dispatch={dispatch}
          nextUri={nextUri}
          formerEmployer={get(state, 'newFormerEmployer', {})}
        />
      )
    case questionTypes.CONNECTIONS:
      return (
        <ConnectionsQuestionPage nextUri={nextUri} {...props} />
      )
  }
}

module.exports = SurveyQuestionPage
