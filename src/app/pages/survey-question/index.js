const React = require('react')
const get = require('lodash/get')
const findIndex = require('lodash/findIndex')
const flatten = require('lodash/flatten')
const uniqBy = require('lodash/uniqBy')
const URLSearchParams = require('url-search-params')
const { getFirstNonNil } = require('@nudj/library')

const getNextSurveyUri = require('./getNextSurveyUri')
const CompanyQuestionPage = require('./company-question')
const ConnectionsQuestionPage = require('./connections-question')
const { questionTypes } = require('../../lib/constants')

const SurveyQuestionPage = props => {
  const {
    user,
    dispatch,
    notification,
    surveyQuestionPage: state,
    ...rest
  } = props
  const survey = get(user, 'hirer.company.survey')
  const nextUri = getNextSurveyUri(survey)
  const section = get(survey, 'section')
  const allSections = get(survey, 'sections', [])
  const question = get(section, 'question', {})
  const questions = flatten(allSections.map(section => get(section, 'questions')))
  const questionIndex = findIndex(questions, { id: get(question, 'id') })
  const employments = get(user, 'employments', [])
  const connectionsCount = get(user, 'connectionsCount', [])
  const companiesAdded = uniqBy(employments.concat(
    get(user, 'newEmployment', [])
  ), employment => employment.id)
  const connections = get(user, 'connections', []).concat(
    get(user, 'newConnection', [])
  )

  const queryParams = new URLSearchParams(get(props, 'location.search', ''))
  const searchQuery = queryParams.get('search')
  const searchInput = getFirstNonNil(state.searchQuery, searchQuery, '')

  switch (question.type) {
    case questionTypes.COMPANIES:
      return (
        <CompanyQuestionPage
          {...rest}
          notification={notification}
          question={question}
          questionNumber={questionIndex + 1}
          questionCount={questions.length}
          companies={companiesAdded}
          dispatch={dispatch}
          nextUri={nextUri}
          employment={get(state, 'newEmployment', {})}
        />
      )
    case questionTypes.CONNECTIONS:
      return (
        <ConnectionsQuestionPage
          {...rest}
          notification={notification}
          nextUri={nextUri}
          question={question}
          connections={connections}
          hasConnections={!!connectionsCount}
          questionNumber={questionIndex + 1}
          questionCount={questions.length}
          dispatch={dispatch}
          selectedConnections={get(state, 'selectedConnections', [])}
          searchInput={searchInput}
          searchQuery={searchQuery}
          showAddIndividualConnectionModal={get(state, 'showAddIndividualConnectionModal', false)}
          newConnection={get(state, 'newConnection', {})}
        />
      )
    default:
      return null
  }
}

module.exports = SurveyQuestionPage
