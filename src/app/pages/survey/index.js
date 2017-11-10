const React = require('react')
const { Helmet } = require('react-helmet')
const _get = require('lodash/get')
const _pick = require('lodash/pick')
const { merge } = require('@nudj/library')

const {
  previous,
  next,
  setNewItemValue,
  addConnection,
  addCompany,
  toggleItem
} = require('./actions')
// const getStyle = require('./style.css')
const LayoutPage = require('../../components/layout-page')
const SurveyQuestionConnections = require('../../components/question-connections')
const ConnectionEditor = require('../../components/connection-editor')
const { questionTypes } = require('../../lib/constants')

function onClickPrevious (dispatch) {
  return event => dispatch(previous())
}

function onClickNext (dispatch) {
  return event => dispatch(next())
}

function onChangeNewItem (dispatch, itemType) {
  return name => event => dispatch(setNewItemValue(itemType, name, event.target.value))
}

function onAddCompany (dispatch, questionId) {
  return () => dispatch(addCompany(questionId))
}

function onAddConnection (dispatch, questionId) {
  return () => dispatch(addConnection(questionId))
}

function onToggleItem (dispatch) {
  return (questionId, itemId) => event => dispatch(toggleItem(questionId, itemId, event.target.checked))
}

function onRemoveItemBasket (dispatch) {
  return (questionId, itemId) => event => dispatch(toggleItem(questionId, itemId, false))
}

const SurveyPage = (props) => {
  // const style = getStyle()
  const dispatch = _get(props, 'dispatch')
  const survey = _get(props, 'user.hirer.company.survey')
  const state = _get(props, 'surveyPage')
  const stepIndex = _get(state, 'step')
  const steps = _get(survey, 'sections', []).reduce((steps, section) => {
    return steps.concat(
      merge(_pick(section, ['id', 'title', 'description']), { displayType: 'section' }),
      ...section.questions.map(question => merge(question, { displayType: 'question' }))
    )
  }, [])
  const step = _get(steps, stepIndex)

  const headerProps = {
    title: 'Complete survey',
    subtitle: 'To impress Robyn and Jamie'
  }

  let questionContent
  if (step.displayType === 'question') {
    const questionType = _get(step, 'type')
    switch (questionType) {
      case questionTypes.COMPANIES:
        questionContent = (
          <div>
            <SurveyQuestionConnections
              question={step}
              items={[]}
              basket={_get(state, `questions[${step.id}]`, [])}
              onToggle={onToggleItem(dispatch)}
              onRemove={onRemoveItemBasket(dispatch)}
            />
          </div>
        )
        break
      case questionTypes.CONNECTIONS:
        questionContent = (
          <div>
            <ConnectionEditor
              onChange={onChangeNewItem(dispatch, 'newConnection')}
              onAdd={onAddConnection(dispatch, step.id)}
              connection={_get(state, 'newConnection', {})}
            />
            <SurveyQuestionConnections
              question={step}
              items={_get(props, 'user.connections', []).concat(_get(props, 'user.newConnection', []))}
              basket={_get(state, `questions[${step.id}]`, [])}
              onToggle={onToggleItem(dispatch)}
              onRemove={onRemoveItemBasket(dispatch)}
            />
          </div>
        )
        break
    }
  }
  const content = (
    <div>
      {stepIndex ? <button onClick={onClickPrevious(dispatch)}>Previous</button> : ''}
      {stepIndex < steps.length - 1 ? <button onClick={onClickNext(dispatch)}>Next</button> : ''}
      <h3>{step.title}</h3>
      <p>{step.description}</p>
      {questionContent}
    </div>
  )

  return (
    <LayoutPage {...props} header={headerProps} headline='Welcome to Aided Recall 🤔'>
      <Helmet>
        <title>nudj - Complete survey</title>
      </Helmet>
      {content}
    </LayoutPage>
  )
}

module.exports = SurveyPage
