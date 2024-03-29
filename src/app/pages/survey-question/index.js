const React = require('react')
const get = require('lodash/get')
const findIndex = require('lodash/findIndex')
const uniqBy = require('lodash/uniqBy')
const uniq = require('lodash/uniq')
const URLSearchParams = require('url-search-params')
const { getFirstNonNil } = require('@nudj/library')

const { getNextSurveyUri, getSavedSurveyQuestionConnections } = require('./helpers')
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
  const { question, questions } = survey
  const questionId = get(question, 'id')
  const questionIndex = findIndex(questions, { id: questionId })
  const employments = get(user, 'employments', [])
  const connectionsCount = get(user, 'connectionsCount', [])
  const companiesAdded = uniqBy(
    employments.concat(get(user, 'newEmployment', [])),
    employment => employment.id
  )
  const connections = get(user, 'results.connections', []).concat(
    get(user, 'newConnection', [])
  )
  const surveyAnswers = get(props, 'surveyAnswers', [])

  const queryParams = new URLSearchParams(get(props, 'location.search', ''))
  const searchQuery = queryParams.get('search')
  const searchInput = getFirstNonNil(state.searchQuery, searchQuery, '')

  const savedConnections = getSavedSurveyQuestionConnections(
    get(question, 'id'),
    surveyAnswers
  )

  const selectedConnectionsChangeSet = state.selectedConnections[questionId] || []

  const selectedConnections = state.connectionsChanged
    ? selectedConnectionsChangeSet
    : uniq(savedConnections.concat(selectedConnectionsChangeSet))

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
          selectedConnections={selectedConnections}
          searchInput={searchInput}
          searchQuery={searchQuery}
          showAddIndividualConnectionModal={get(state, 'showAddIndividualConnectionModal', false)}
          loading={get(state, 'loading', false)}
          newConnection={get(state, 'newConnection', {})}
        />
      )
    default:
      return null
  }
}

module.exports = SurveyQuestionPage
