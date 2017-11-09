const React = require('react')
const { Helmet } = require('react-helmet')
const _get = require('lodash/get')
const _pick = require('lodash/pick')
const _find = require('lodash/find')
const { merge } = require('@nudj/library')

const {
  previous,
  next,
  setNewConnectionValue,
  addConnection,
  toggleConnection
} = require('./actions')
// const getStyle = require('./style.css')
const LayoutPage = require('../../components/layout-page')
const ConnectionEditor = require('../../components/connection-editor')

function onClickPrevious (dispatch) {
  return (event) => dispatch(previous())
}

function onClickNext (dispatch) {
  return (event) => dispatch(next())
}

function onChangeNewConnection (dispatch) {
  return (name) => (event) => {
    dispatch(setNewConnectionValue(name, event.target.value))
  }
}

function onAddConnection (dispatch, questionId) {
  return () => {
    dispatch(addConnection(questionId))
  }
}

function onChangeCheckbox (dispatch, questionId, connectionId) {
  return event => {
    dispatch(toggleConnection(questionId, connectionId, event.target.checked))
  }
}

const RecallSurvey = (props) => {
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

  let stepContent
  if (step.displayType === 'section') {
    stepContent = (
      <div>
        <h3>{step.title}</h3>
        <p>{step.description}</p>
      </div>
    )
  } else {
    const connections = _get(state, `connections`, [])
    const questionConnections = _get(state, `questions[${step.id}]`, [])
    const newConnection = _get(state, 'newConnection', {})
    stepContent = (
      <div>
        <h3>{step.title}</h3>
        <p>{step.description}</p>
        <ConnectionEditor
          onChange={onChangeNewConnection(dispatch)}
          onAdd={onAddConnection(dispatch, step.id)}
          connection={newConnection}
        />
        <table>
          <thead>
            <tr>
              <th />
              <th>First name</th>
              <th>Last name</th>
              <th>Job title</th>
              <th>Company</th>
              <th>Email</th>
              <th>Source</th>
            </tr>
          </thead>
          <tbody>
            {connections.map((connection, index) => {
              const {
                id,
                firstName,
                lastName,
                title,
                company,
                email
              } = connection

              return (
                <tr key={id}>
                  <td><input type='checkbox' checked={questionConnections.includes(connection.id)} onChange={onChangeCheckbox(dispatch, step.id, connection.id)} /></td>
                  <td>{firstName}</td>
                  <td>{lastName}</td>
                  <td>{title}</td>
                  <td>{company}</td>
                  <td>{email}</td>
                  <td>Survey</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div>
          <h4>Basket</h4>
          <ul>
            {questionConnections.map(connectionId => {
              const connection = _find(connections, { id: connectionId })
              return <li key={connection.id}>{connection.firstName} {connection.lastName}</li>
            })}
          </ul>
        </div>
      </div>
    )
  }
  const content = (
    <div>
      {stepIndex ? <button onClick={onClickPrevious(dispatch)}>Previous</button> : ''}
      {stepIndex < steps.length - 1 ? <button onClick={onClickNext(dispatch)}>Next</button> : ''}
      {stepContent}
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

module.exports = RecallSurvey
