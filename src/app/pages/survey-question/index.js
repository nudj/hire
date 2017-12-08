const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')
const findIndex = require('lodash/findIndex')
const flatten = require('lodash/flatten')

const { Text, Link, Align, Card } = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')
const { merge } = require('@nudj/library')

const {
  setNewItemValue,
  addConnection,
  addFormerEmployer
} = require('./actions')
const getNextSurveyUri = require('./getNextSurveyUri')
const style = require('./style.css')
const sharedStyle = require('../shared.css')
const FormCompany = require('../../components/form-company')
const FormConnection = require('../../components/form-connection')
const { questionTypes } = require('../../lib/constants')

function onChangeNewItem (dispatch, itemType) {
  return event => dispatch(setNewItemValue(itemType, event.name, event.value))
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
        <Card style={style.companyForm}>
          <FormCompany
            onChange={onChangeNewItem(dispatch, 'newFormerEmployer')}
            onSubmit={onAddCompany(dispatch, question.id)}
            company={get(state, 'newFormerEmployer', {})}
          />
        </Card>
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
    <div className={css(sharedStyle.root)}>
      <Helmet>
        <title>nudj - Complete survey</title>
      </Helmet>
      <div className={css(sharedStyle.wrapper)}>
        <Text element='div' style={sharedStyle.stepCounter}>
          Step {questionIndex + 1} of {allQuestions.length}
        </Text>
        <Text element='div' size='largeIi' style={merge(sharedStyle.header, style.header)}>
          {question.title}
        </Text>
        <div className={css(sharedStyle.body)}>
          <Text element='div' style={sharedStyle.subheading}>
            {question.description}
          </Text>
          {questionContent}
          <div className={css(sharedStyle.footer)}>
            <Align
              leftChildren={
                <Text style={sharedStyle.addCounter}>
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
