const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')
const _findIndex = require('lodash/findIndex')

const {
  setNewItemValue,
  addConnection,
  addFormerEmployer,
  toggleItem
} = require('./actions')
const LayoutPage = require('../../components/layout-page')
const FormCompany = require('../../components/form-company')
const AccumulatorFormerEmployers = require('../../components/accumulator-former-employers')
const FormConnection = require('../../components/form-connection')
const AccumulatorConnections = require('../../components/accumulator-connections')
const Link = require('../../components/link/link')
const { questionTypes } = require('../../lib/constants')

function onChangeNewItem (dispatch, itemType) {
  return name => event =>
    dispatch(setNewItemValue(itemType, name, event.target.value))
}

function onAddCompany (dispatch, questionId) {
  return () => dispatch(addFormerEmployer(questionId))
}

function onAddConnection (dispatch, questionId) {
  return () => dispatch(addConnection(questionId))
}

function onToggleItem (dispatch) {
  return (questionId, itemId) => event =>
    dispatch(toggleItem(questionId, itemId, event.target.checked))
}

function onRemoveItemBasket (dispatch) {
  return (questionId, itemId) => event =>
    dispatch(toggleItem(questionId, itemId, false))
}

const SurveyQuestionPage = props => {
  const {
    tooltip,
    user,
    history,
    dispatch,
    overlay,
    dialog,
    onPageLeave,
    notification,
    surveyQuestionPage: state
  } = props
  const survey = get(user, 'hirer.company.survey')
  const section = get(survey, 'section')
  const question = get(section, 'question')
  const questionIndex = _findIndex(section.questions, { id: question.id })
  const onboardingSegment = get(user, 'hirer.onboarded') ? '' : '/onboarding'

  const headerProps = {
    title: 'Complete survey',
    subtitle: 'To impress Robyn and Jamie'
  }

  let previousUri = ''
  const previousQuestion = section.questions[questionIndex - 1]
  if (previousQuestion) {
    previousUri = `${onboardingSegment}/surveys/${survey.slug}/sections/${section.id}/${previousQuestion.type.toLowerCase()}/${previousQuestion.id}`
  } else {
    previousUri = `${onboardingSegment}/surveys/${survey.slug}/sections/${section.id}`
  }

  let nextUri = ''
  const nextQuestion = section.questions[questionIndex + 1]
  if (nextQuestion) {
    nextUri = `${onboardingSegment}/surveys/${survey.slug}/sections/${
      section.id
    }/${nextQuestion.type.toLowerCase()}/${nextQuestion.id}`
  } else {
    const sectionIndex = _findIndex(survey.sections, { id: section.id })
    const nextSection = survey.sections[sectionIndex + 1]
    if (nextSection) {
      nextUri = `${onboardingSegment}/surveys/${survey.slug}/sections/${nextSection.id}`
    } else {
      nextUri = `${onboardingSegment}/surveys/${survey.slug}/complete`
    }
  }

  let questionContent
  const questionType = get(question, 'type')
  switch (questionType) {
    case questionTypes.COMPANIES:
      const formerEmployers = get(user, 'formerEmployers', []).concat(
        get(user, 'newFormerEmployer', [])
      )
      questionContent = (
        <div>
          <FormCompany
            onChange={onChangeNewItem(dispatch, 'newFormerEmployer')}
            onSubmit={onAddCompany(dispatch, question.id)}
            company={get(state, 'newFormerEmployer', {})}
          />
          <AccumulatorFormerEmployers formerEmployers={formerEmployers} />
        </div>
      )
      break
    case questionTypes.CONNECTIONS:
      const connections = get(user, 'connections', []).concat(
        get(user, 'newConnection', [])
      )
      questionContent = (
        <div>
          <FormConnection
            onChange={onChangeNewItem(dispatch, 'newConnection')}
            onSubmit={onAddConnection(dispatch, question.id)}
            connection={get(state, 'newConnection', {})}
          />
          <AccumulatorConnections
            question={question}
            connections={connections}
            basket={get(state, `questions[${question.id}]`, [])}
            onToggle={onToggleItem(dispatch)}
            onRemove={onRemoveItemBasket(dispatch)}
          />
        </div>
      )
      break
  }

  return (
    <LayoutPage
      tooltip={tooltip}
      user={user}
      history={history}
      dispatch={dispatch}
      overlay={overlay}
      dialog={dialog}
      onPageLeave={onPageLeave}
      notification={notification}
      header={headerProps}
      headline='Welcome to Aided Recall 🤔'
    >
      <Helmet>
        <title>nudj - Complete survey</title>
      </Helmet>
      <Link to={previousUri}>Previous</Link>
      <Link to={nextUri}>Next</Link>
      <h3>{question.title}</h3>
      <p>{question.description}</p>
      {questionContent}
    </LayoutPage>
  )
}
module.exports = SurveyQuestionPage