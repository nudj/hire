const React = require('react')
const get = require('lodash/get')
const findIndex = require('lodash/findIndex')
const flatten = require('lodash/flatten')

const { setNewItemValue, addConnection } = require('./actions')
const getNextSurveyUri = require('./getNextSurveyUri')
const CompanyQuestionPage = require('./company-question')
const FormConnection = require('../../components/form-connection')
const { questionTypes } = require('../../lib/constants')

function onChangeNewItem (dispatch, itemType) {
  return event => dispatch(setNewItemValue(itemType, event.name, event.value))
}

function onAddConnection (dispatch, questionId) {
  return () => dispatch(addConnection(questionId))
}

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
  const allQuestions = flatten(allSections.map(section => section.questions))
  const questionIndex = findIndex(allQuestions, { id: question.id })
  const formerEmployers = get(user, 'formerEmployers', [])
  const companiesAdded = formerEmployers.concat(
    get(user, 'newFormerEmployer', [])
  )

  switch (get(question, 'type')) {
    case questionTypes.COMPANIES:
      return (
        <CompanyQuestionPage
          question={question}
          questionNumber={questionIndex + 1}
          surveyLength={allQuestions.length}
          companiesAdded={companiesAdded.length}
          dispatch={dispatch}
          nextUri={nextUri}
          formerEmployer={get(state, 'newFormerEmployer', {})}
        />
      )
    case questionTypes.CONNECTIONS:
      return (
        <FormConnection
          onChange={onChangeNewItem(dispatch, 'newConnection')}
          onSubmit={onAddConnection(dispatch, question.id)}
          connection={get(state, 'newConnection', {})}
        />
      )
  }
}

module.exports = SurveyQuestionPage
