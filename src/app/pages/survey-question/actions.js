const humanparser = require('humanparser')
const get = require('lodash/get')
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
  return _reduce(
    dependencies,
    (result, value, key) => {
      return result ? answers[key] === value : false
    },
    true
  )
}

function getSteps (sections = []) {
  return sections.reduce((steps, section) => {
    return steps.concat(
      _pick(section, ['id', 'title', 'description']),
      ...section.questions
    )
  }, [])
}

function getStepIndex (state, indexModifier, validate) {
  const steps = getSteps(get(state, 'app.user.hirer.company.survey.sections'))
  const answers = get(state, 'surveyQuestionPage.answers')
  const originalIndex = get(state, 'surveyQuestionPage.step')
  let index = originalIndex
  let nextIndex
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
  const survey = get(state, 'app.user.hirer.company.survey', {})
  const answers = get(state, 'surveyQuestionPage.answers', {})
  const connections = getConnections(getQuestions(survey), answers)
  return dispatch(setValue('connections', connections))
}

module.exports.submitConnections = () => (dispatch, getState) => {
  const state = getState()
  const survey = get(state, 'app.user.hirer.company.survey', {})
  const connections = get(state, 'surveyQuestionPage.connections', []).map(
    connection => _omit(connection, ['id'])
  )
  return dispatch(
    actions.app.postData({
      url: `/surveys/${get(survey, 'slug')}`,
      method: 'post',
      data: {
        connections,
        source: 'survey'
      }
    })
  )
}

function getQuestions (survey) {
  return survey.sections.reduce((questions, section) => {
    return questions.concat(section.questions)
  }, [])
}

function getConnections (questions, answers) {
  const nameQuestions = _filter(questions, question =>
    get(question, 'tags.length')
  )
  const connections = nameQuestions.reduce((connections, question) => {
    return connections.concat(getConnectionsForQuestion(question, answers))
  }, [])
  return connections
}

function getConnectionsForQuestion (question, answers) {
  return get(answers, question.name, '')
    .split('\n')
    .reduce((connections, connection) => {
      if (connection.length) {
        connections = connections.concat(connection)
      }
      return connections
    }, [])
    .map(createConnection(question.tags))
}

function createConnection (tags) {
  return connection => {
    return merge(
      {
        id: _camelCase(connection),
        tags
      },
      _omit(humanparser.parseName(connection), ['fullName'])
    )
  }
}

const SET_NEW_ITEM_VALUE = `${PREFIX}_SET_NEW_ITEM_VALUE`
module.exports.SET_NEW_ITEM_VALUE = SET_NEW_ITEM_VALUE
function setNewItemValue (name, key, value) {
  return {
    type: SET_NEW_ITEM_VALUE,
    name,
    key,
    value
  }
}
module.exports.setNewItemValue = (name, key, value) => (dispatch, getState) => {
  return dispatch(setNewItemValue(name, key, value))
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
module.exports.addConnection = questionId => (dispatch, getState) => {
  const state = getState()
  const survey = get(state, 'app.user.hirer.company.survey', {})
  const section = get(survey, 'section')
  const question = get(section, 'question')
  const connection = get(state, 'surveyQuestionPage.newConnection')
  return dispatch(
    actions.app.postData(
      {
        url: `/surveys/${survey.slug}/sections/${section.id}/connections/${
          question.id
        }`,
        method: 'post',
        data: {
          connection,
          source: 'survey'
        }
      },
      () => {
        const state = getState()
        const newConnection = get(state, 'app.user.newConnection')
        dispatch(addConnection(questionId, newConnection))
      }
    )
  )
}

const ADD_FORMER_EMPLOYER = `${PREFIX}_ADD_FORMER_EMPLOYER`
module.exports.ADD_FORMER_EMPLOYER = ADD_FORMER_EMPLOYER
function addFormerEmployer (questionId, newItem) {
  return {
    type: ADD_FORMER_EMPLOYER,
    questionId,
    newItem
  }
}
module.exports.addFormerEmployer = questionId => (dispatch, getState) => {
  const state = getState()
  const survey = get(state, 'app.user.hirer.company.survey', {})
  const section = get(survey, 'section')
  const question = get(section, 'question')
  const formerEmployer = get(state, 'surveyQuestionPage.newFormerEmployer')
  return dispatch(
    actions.app.postData(
      {
        url: `/surveys/${survey.slug}/sections/${section.id}/companies/${
          question.id
        }`,
        method: 'post',
        data: {
          formerEmployer,
          source: 'survey'
        }
      },
      () => {
        const state = getState()
        const newFormerEmployer = get(state, 'app.user.newFormerEmployer')
        dispatch(addFormerEmployer(questionId, newFormerEmployer))
      }
    )
  )
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
module.exports.toggleItem = (questionId, itemId, value) => (
  dispatch,
  getState
) => {
  return dispatch(toggleItem(questionId, itemId, value))
}
