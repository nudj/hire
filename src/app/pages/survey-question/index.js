const React = require('react')
const get = require('lodash/get')
const findIndex = require('lodash/findIndex')
const flatten = require('lodash/flatten')
const URLSearchParams = require('url-search-params')

const getNextSurveyUri = require('./getNextSurveyUri')
const CompanyQuestionPage = require('./company-question')
const ConnectionsQuestionPage = require('./connections-question')
const { questionTypes } = require('../../lib/constants')

const SurveyQuestionPage = props => {
  const { user, dispatch, surveyQuestionPage: state, ...rest } = props
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
  const connections = get(user, 'connections', []).concat(
    get(user, 'newConnection', [])
  )

  const queryParams = new URLSearchParams(get(props, 'location.search', ''))
  const searchQueryParam = queryParams.get('search')
  let searchQuery = ''

  if (state.searchQuery !== null) {
    searchQuery = state.searchQuery
  } else if (searchQueryParam) {
    searchQuery = searchQueryParam
  }

  switch (question.type) {
    case questionTypes.COMPANIES:
      return (
        <CompanyQuestionPage
          {...rest}
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
        <ConnectionsQuestionPage
          {...rest}
          nextUri={nextUri}
          question={question}
          connections={connections}
          questionNumber={questionIndex + 1}
          questionCount={questions.length}
          dispatch={dispatch}
          selectedConnections={get(state, 'selectedConnections', [])}
          query={searchQuery}
        />
      )
  }
}

module.exports = SurveyQuestionPage
