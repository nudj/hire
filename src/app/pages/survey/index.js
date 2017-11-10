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
  addFormerEmployer,
  toggleItem
} = require('./actions')
// const getStyle = require('./style.css')
const LayoutPage = require('../../components/layout-page')
const FormCompany = require('../../components/form-company')
const AccumulatorFormerEmployers = require('../../components/accumulator-former-employers')
const FormConnection = require('../../components/form-connection')
const AccumulatorConnections = require('../../components/accumulator-connections')
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
  return () => dispatch(addFormerEmployer(questionId))
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
        const formerEmployers = _get(props, 'user.formerEmployers', []).concat(_get(props, 'user.newFormerEmployer', []))
        questionContent = (
          <div>
            <FormCompany
              onChange={onChangeNewItem(dispatch, 'newFormerEmployer')}
              onSubmit={onAddCompany(dispatch, step.id)}
              company={_get(state, 'newFormerEmployer', {})}
            />
            <AccumulatorFormerEmployers
              formerEmployers={formerEmployers}
            />
          </div>
        )
        break
      case questionTypes.CONNECTIONS:
        const connections = _get(props, 'user.connections', []).concat(_get(props, 'user.newConnection', []))
        questionContent = (
          <div>
            <FormConnection
              onChange={onChangeNewItem(dispatch, 'newConnection')}
              onSubmit={onAddConnection(dispatch, step.id)}
              connection={_get(state, 'newConnection', {})}
            />
            <AccumulatorConnections
              question={step}
              connections={connections}
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
