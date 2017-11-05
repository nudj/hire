const humanparser = require('humanparser')
const _get = require('lodash/get')
const _isEmpty = require('lodash/isEmpty')
const _reduce = require('lodash/reduce')
const _flatten = require('lodash/flatten')
const _isUndefined = require('lodash/isUndefined')
const _pick = require('lodash/pick')
const _filter = require('lodash/filter')
const _camelCase = require('lodash/camelCase')
const _omit = require('lodash/omit')
const actions = require('@nudj/framework/actions')
const { merge } = require('@nudj/library')
const PREFIX = 'RECALL_SURVEY'

function getResets (steps, questionName) {
  const dependantSections = _filter(steps, section => Object.keys(section.dependencies || {}).includes(questionName))
  return _flatten(dependantSections.map(section => section.questions.map(question => question.name)))
}

function matchesDependencies (dependencies, answers) {
  if (_isEmpty(dependencies)) return true
  return _reduce(dependencies, (result, value, key) => {
    return result ? answers[key] === value : false
  }, true)
}

function getSteps (sections = []) {
  return sections.reduce((steps, section) => {
    return steps.concat(_pick(section, ['id', 'title', 'description']), ...section.questions)
  }, [])
}

function getStepIndex (state, indexModifier, validate) {
  const steps = getSteps(_get(state, 'app.company.survey.sections'))
  const answers = _get(state, 'surveyPage.answers')
  const originalIndex = _get(state, 'surveyPage.step')
  let index = originalIndex
  let nextIndex
  if (
    validate &&
    steps[originalIndex].required &&
    steps[originalIndex].name &&
    !answers[steps[originalIndex].name]
  ) {
    // required answer not given
    return originalIndex
  }
  while (_isUndefined(nextIndex)) {
    const testIndex = indexModifier(index)
    const testSection = steps[testIndex]
    if (!testSection) {
      nextIndex = originalIndex || 0
    } else {
      const dependencies = testSection.dependencies
      if (matchesDependencies(dependencies, answers)) {
        nextIndex = testIndex
      }
      index = testIndex
    }
  }
  return nextIndex
}

const SET_VALUE = `${PREFIX}_SET_VALUE`
module.exports.SET_VALUE = SET_VALUE
function setValue (name, value) {
  return {
    type: SET_VALUE,
    name,
    value
  }
}
module.exports.previous = () => (dispatch, getState) => {
  dispatch(actions.app.hideNotification())
  return dispatch(setValue('step', getStepIndex(getState(), i => i - 1)))
}
module.exports.next = () => (dispatch, getState) => {
  dispatch(actions.app.hideNotification())
  return dispatch(setValue('step', getStepIndex(getState(), i => i + 1, true)))
}

const SET_ANSWER = `${PREFIX}_SET_ANSWER`
module.exports.SET_ANSWER = SET_ANSWER
function setAnswer (name, value, resets = []) {
  return {
    type: SET_ANSWER,
    name,
    value,
    resets
  }
}
module.exports.setAnswer = (name, value) => (dispatch, getState) => {
  const resets = getResets(_get(getState(), 'app.company.survey.sections'), name)
  return dispatch(setAnswer(name, value, resets))
}

const TOGGLE_ANSWER = `${PREFIX}_TOGGLE_ANSWER`
module.exports.TOGGLE_ANSWER = TOGGLE_ANSWER
function toggleAnswer (name, value, toggle, resets) {
  return {
    type: TOGGLE_ANSWER,
    name,
    value,
    toggle,
    resets
  }
}
module.exports.toggleAnswer = (name, value, toggle) => (dispatch, getState) => {
  const resets = getResets(_get(getState(), 'app.company.survey.sections'), name)
  return dispatch(toggleAnswer(name, value, toggle, resets))
}

module.exports.finishSurvey = () => (dispatch, getState) => {
  const state = getState()
  const survey = _get(state, 'app.company.survey', {})
  const answers = _get(state, 'surveyPage.answers', {})
  const connections = getConnections(getQuestions(survey), answers)
  return dispatch(setValue('connections', connections))
}

module.exports.submitConnections = () => (dispatch, getState) => {
  const state = getState()
  const survey = _get(state, 'app.company.survey', {})
  const connections = _get(state, 'surveyPage.connections', []).map(connection => _omit(connection, ['id']))
  return dispatch(actions.app.postData({
    url: `/surveys/${_get(survey, 'slug')}`,
    method: 'post',
    data: {
      connections,
      source: 'survey'
    }
  }))
}

function getQuestions (survey) {
  return survey.sections.reduce((questions, section) => {
    return questions.concat(section.questions)
  }, [])
}

function getConnections (questions, answers) {
  const nameQuestions = _filter(questions, question => _get(question, 'tags.length'))
  const connections = nameQuestions.reduce((connections, question) => {
    return connections.concat(getConnectionsForQuestion(question, answers))
  }, [])
  return connections
}

function getConnectionsForQuestion (question, answers) {
  return _get(answers, question.name, '').split('\n').reduce((connections, connection) => {
    if (connection.length) {
      connections = connections.concat(connection)
    }
    return connections
  }, []).map(createConnection(question.tags))
}

function createConnection (tags) {
  return connection => {
    return merge({
      id: _camelCase(connection),
      tags
    }, _omit(humanparser.parseName(connection), ['fullName']))
  }
}

module.exports.setConnectionValue = (id, name, value) => (dispatch, getState) => {
  const state = getState()
  let connections = _get(state, 'surveyPage.connections')
  connections = connections.map(connection => {
    if (connection.id === id) {
      connection[name] = value
    }
    return connection
  })

  return dispatch(setValue('connections', connections))
}
