const get = require('lodash/get')
const actions = require('@nudj/framework/actions')
const { quickDispatch } = require('@nudj/library')

const PREFIX = 'SURVEY'

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
module.exports.setNewItemValue = (name, key, value) =>
  quickDispatch(setNewItemValue(name, key, value))

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

const TOGGLE_CONNECTION = 'TOGGLE_CONNECTION'
module.exports.TOGGLE_CONNECTION = TOGGLE_CONNECTION
function toggleConnection (connectionId) {
  return {
    type: TOGGLE_CONNECTION,
    connectionId
  }
}
module.exports.toggleConnection = connectionId =>
  quickDispatch(toggleConnection(connectionId))

const UPDATE_CONNECTIONS_SEARCH_QUERY = 'UPDATE_CONNECTIONS_SEARCH_QUERY'
module.exports.UPDATE_CONNECTIONS_SEARCH_QUERY = UPDATE_CONNECTIONS_SEARCH_QUERY

const updateConnectionsSearchQuery = query => ({
  type: UPDATE_CONNECTIONS_SEARCH_QUERY,
  query
})
module.exports.updateConnectionsSearchQuery = updateConnectionsSearchQuery

module.exports.saveSurveyAnswers = surveyQuestion => (dispatch, getState) => {
  const state = getState()
  const survey = get(state, 'app.user.hirer.company.survey', {})
  const section = get(survey, 'section')
  const question = get(section, 'question')
  const { selectedConnections } = state.surveyQuestionPage
  const connections = selectedConnections || []
  return dispatch(
    actions.app.postData(
      {
        url: `/surveys/${survey.slug}/sections/${section.id}/connections/${
          question.id
        }`,
        method: 'post',
        data: {
          surveyQuestion,
          connections
        }
      }
    )
  )
}
