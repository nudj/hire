const React = require('react')
const { Helmet } = require('react-helmet')
const _get = require('lodash/get')
const _pick = require('lodash/pick')

const {
  previous,
  next,
  setAnswer,
  toggleAnswer,
  finishSurvey,
  setConnectionValue,
  submitConnections
} = require('./actions')
const getStyle = require('./style.css')
const LayoutPage = require('../../components/layout-page')
const SurveySection = require('../../components/survey-section')
const ConnectionsEditor = require('../../components/connections-editor')

function onChangeChoice (dispatch) {
  return (name, value) => (event) => {
    dispatch(setAnswer(name, value))
    dispatch(next())
  }
}

function onChangeMultiChoice (dispatch) {
  return (name, value) => (event) => dispatch(toggleAnswer(name, value, event.target.checked))
}

function onChangeText (dispatch) {
  return (name) => (event) => dispatch(setAnswer(name, event.target.value))
}

function onClickPrevious (dispatch) {
  return (event) => dispatch(previous())
}

function onClickNext (dispatch) {
  return (event) => dispatch(next())
}

function onClickFinish (dispatch) {
  return (event) => dispatch(finishSurvey())
}

function onChangeConnection (dispatch) {
  return (id, name) => (event) => {
    dispatch(setConnectionValue(id, name, event.target.type === 'checkbox' ? event.target.checked : event.target.value))
  }
}

function onClickSubmit (dispatch) {
  return (event) => dispatch(submitConnections())
}

const RecallSurvey = (props) => {
  const style = getStyle()
  const dispatch = _get(props, 'dispatch')
  const survey = _get(props, 'company.survey')
  const state = _get(props, 'surveyPage')
  const handlers = {
    onChangeChoice: onChangeChoice(dispatch),
    onChangeMultiChoice: onChangeMultiChoice(dispatch),
    onChangeText: onChangeText(dispatch)
  }
  const stepIndex = _get(state, 'step')
  const steps = _get(survey, 'sections', []).reduce((steps, section) => {
    return steps.concat(_pick(section, ['id', 'title', 'description']), ...section.questions)
  }, [])
  const step = _get(steps, stepIndex)
  const connections = _get(state, 'connections')

  const headerProps = {
    title: 'Complete survey',
    subtitle: 'To impress Robyn and Jamie',
    children: connections ? <button className={style.upload} onClick={onClickSubmit(dispatch)}>Upload</button> : ''
  }

  let content
  if (!connections) {
    content = (
      <div>
        <SurveySection {...step} handlers={handlers} answers={_get(props, 'surveyPage.answers')} />
        {stepIndex ? <button onClick={onClickPrevious(dispatch)}>Previous</button> : ''}
        {stepIndex < steps.length - 1 ? <button onClick={onClickNext(dispatch)}>Next</button> : <button onClick={onClickFinish(dispatch)}>Finish</button>}
      </div>
    )
  } else {
    content = (
      <div>
        <ConnectionsEditor
          connections={connections}
          onChange={onChangeConnection(dispatch)}
        />
      </div>
    )
  }

  return (
    <LayoutPage {...props} header={headerProps} headline='Welcome to Aided Recall 🤔'>
      <Helmet>
        <title>nudj - Complete survey</title>
      </Helmet>
      {content}
    </LayoutPage>
  )
}

module.exports = RecallSurvey
