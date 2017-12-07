const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')
const findIndex = require('lodash/findIndex')
const flatten = require('lodash/flatten')

const { Text, Link, Align } = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')

const {
  setNewItemValue,
  addConnection,
  addFormerEmployer
} = require('./actions')
const getNextSurveyUri = require('./getNextSurveyUri')
const style = require('./style.css')
const FormCompany = require('../../components/form-company')
const FormConnection = require('../../components/form-connection')
const { questionTypes } = require('../../lib/constants')

function onChangeNewItem (dispatch, itemType) {
  return name => event => dispatch(setNewItemValue(itemType, name, event.value))
}

function onAddCompany (dispatch, questionId) {
  return () => dispatch(addFormerEmployer(questionId))
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
  const question = get(survey, 'section.question')
  const nextUri = getNextSurveyUri(survey)
  const headerProps = {
    title: 'Complete survey',
    subtitle: 'To impress Robyn and Jamie'
  }
  const section = get(survey, 'section')
  const allSections = get(survey, 'sections', [])
  const question = get(section, 'question')
  const allQuestions = flatten(allSections.map(section => section.questions))
  const questionIndex = findIndex(allQuestions, { id: question.id })

  const formerEmployers = get(user, 'formerEmployers', [])
  const companiesAdded = formerEmployers.concat(
    get(user, 'newFormerEmployer', [])
  )

  let questionContent
  const questionType = get(question, 'type')
  switch (questionType) {
    case questionTypes.COMPANIES:
      questionContent = (
        <FormCompany
          onChange={onChangeNewItem(dispatch, 'newFormerEmployer')}
          onSubmit={onAddCompany(dispatch, question.id)}
          company={get(state, 'newFormerEmployer', {})}
        />
      )
      break
    case questionTypes.CONNECTIONS:
      questionContent = (
        <FormConnection
          onChange={onChangeNewItem(dispatch, 'newConnection')}
          onSubmit={onAddConnection(dispatch, question.id)}
          connection={get(state, 'newConnection', {})}
        />
      )
      break
  }

  return (
    <div className={css(style.root)}>
      <Helmet>
        <title>nudj - Complete survey</title>
      </Helmet>
      <div className={css(style.wrapper)}>
        <Text element='div' size='regular' style={style.stepCounter}>
          Step {questionIndex + 1} of {allQuestions.length}
        </Text>
        <div className={css(style.header)}>
          <Text element='div' size='largeIi' style={style.title}>
            {question.title}
          </Text>
        </div>
        <div className={css(style.body)}>
          <Text element='div' size='regular' style={style.subtitle}>
            {question.description}
          </Text>
          {questionContent}
          <div className={css(style.actionBar)}>
            <Align
              leftChildren={
                <Text style={style.addCounter}>
                  {`${companiesAdded.length} added`}
                </Text>
              }
              rightChildren={
                <Link volume='cheer' href={nextUri}>
                  Next
                </Link>
              }
            />
          </div>
        </div>
      </div>
    </div>
  )
}

SurveyQuestionPage.handlesLoading = true

module.exports = SurveyQuestionPage
