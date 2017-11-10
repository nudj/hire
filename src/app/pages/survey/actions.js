const humanparser = require('humanparser')
const _get = require('lodash/get')
const _isEmpty = require('lodash/isEmpty')
const _reduce = require('lodash/reduce')
const _isUndefined = require('lodash/isUndefined')
const _pick = require('lodash/pick')
const _filter = require('lodash/filter')
const _camelCase = require('lodash/camelCase')
const _omit = require('lodash/omit')
const actions = require('@nudj/framework/actions')
const { merge } = require('@nudj/library')
const PREFIX = 'SURVEY'

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
  const steps = getSteps(_get(state, 'app.user.hirer.company.survey.sections'))
  const answers = _get(state, 'surveyPage.answers')
  const originalIndex = _get(state, 'surveyPage.step')
  let index = originalIndex
  let nextIndex
  // if (
  //   validate &&
  //   steps[originalIndex].required &&
  //   steps[originalIndex].name &&
  //   !answers[steps[originalIndex].name]
  // ) {
  //   // required answer not given
  //   return originalIndex
  // }
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

module.exports.finishSurvey = () => (dispatch, getState) => {
  const state = getState()
  const survey = _get(state, 'app.user.hirer.company.survey', {})
  const answers = _get(state, 'surveyPage.answers', {})
  const connections = getConnections(getQuestions(survey), answers)
  return dispatch(setValue('connections', connections))
}

module.exports.submitConnections = () => (dispatch, getState) => {
  const state = getState()
  const survey = _get(state, 'app.user.hirer.company.survey', {})
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

const SET_NEW_ITEM_VALUE = `${PREFIX}_SET_NEW_ITEM_VALUE`
module.exports.SET_NEW_ITEM_VALUE = SET_NEW_ITEM_VALUE
function setNewItemValue (itemType, name, value) {
  return {
    type: SET_NEW_ITEM_VALUE,
    itemType,
    name,
    value
  }
}
module.exports.setNewItemValue = (itemType, name, value) => (dispatch, getState) => {
  return dispatch(setNewItemValue(itemType, name, value))
}

const ADD_CONNECTION = `${PREFIX}_ADD_CONNECTION`
module.exports.ADD_CONNECTION = ADD_CONNECTION
function addConnection (questionId, newItem) {
  return {
    type: ADD_CONNECTION,
    questionId,
    newItem
  }
}
module.exports.addConnection = (questionId) => (dispatch, getState) => {
  const state = getState()
  const survey = _get(state, 'app.user.hirer.company.survey', {})
  const connection = _get(state, 'surveyPage.newConnection')
  return dispatch(actions.app.postData({
    url: `/surveys/${_get(survey, 'slug')}`,
    method: 'post',
    data: {
      connection,
      source: 'survey'
    }
  }, () => {
    const state = getState()
    const newConnection = _get(state, 'app.user.newConnection')
    dispatch(addConnection(questionId, newConnection))
  }))
}

const ADD_COMPANY = `${PREFIX}_ADD_COMPANY`
module.exports.ADD_COMPANY = ADD_COMPANY
function addCompany (questionId, newItem) {
  return {
    type: ADD_COMPANY,
    questionId,
    newItem
  }
}
module.exports.addCompany = (questionId) => (dispatch, getState) => {
  const state = getState()
  const survey = _get(state, 'app.user.hirer.company.survey', {})
  const company = _get(state, 'surveyPage.newCompany')
  // return dispatch(actions.app.postData({
  //   url: `/surveys/${_get(survey, 'slug')}`,
  //   method: 'post',
  //   data: {
  //     company,
  //     source: 'survey'
  //   }
  // }, () => {
  //   const state = getState()
  //   const newConnection = _get(state, 'app.user.newConnection')
  //   dispatch(addCompany(questionId, newConnection))
  // }))
}

const TOGGLE_ITEM = `${PREFIX}_TOGGLE_ITEM`
module.exports.TOGGLE_ITEM = TOGGLE_ITEM
function toggleItem (questionId, itemId, value) {
  return {
    type: TOGGLE_ITEM,
    questionId,
    itemId,
    value
  }
}
module.exports.toggleItem = (questionId, itemId, value) => (dispatch, getState) => {
  return dispatch(toggleItem(questionId, itemId, value))
}
