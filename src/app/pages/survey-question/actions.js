const axios = require('axios')
const get = require('lodash/get')
const uniq = require('lodash/uniq')
const actions = require('@nudj/framework/actions')

const getSavedSurveyQuestionConnections = require('./getSavedSurveyQuestionConnections')

const PREFIX = 'SURVEY'

const SET_NEW_ITEM_VALUE = `${PREFIX}_SET_NEW_ITEM_VALUE`
module.exports.SET_NEW_ITEM_VALUE = SET_NEW_ITEM_VALUE
module.exports.setNewItemValue = (name, key, value) => ({
  type: SET_NEW_ITEM_VALUE,
  name,
  key,
  value
})

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
function addEmployment (questionId, newItem) {
  return {
    type: ADD_FORMER_EMPLOYER,
    questionId,
    newItem
  }
}
module.exports.addEmployment = questionId => (dispatch, getState) => {
  const state = getState()
  const survey = get(state, 'app.user.hirer.company.survey', {})
  const section = get(survey, 'section')
  const question = get(section, 'question')
  const employment = get(state, 'surveyQuestionPage.newEmployment')
  return dispatch(
    actions.app.postData(
      {
        url: `/surveys/${survey.slug}/sections/${section.id}/companies/${
          question.id
        }`,
        method: 'post',
        data: {
          employment: employment.name,
          source: 'survey'
        }
      },
      () => {
        const state = getState()
        const newEmployment = get(state, 'app.user.newEmployment')
        dispatch(addEmployment(questionId, newEmployment))
      }
    )
  )
}

const SET_SELECTED_CONNECTIONS = 'SET_SELECTED_CONNECTIONS'
module.exports.SET_SELECTED_CONNECTIONS = SET_SELECTED_CONNECTIONS

const setSelectedConnections = (questionId, connections) => ({
  type: SET_SELECTED_CONNECTIONS,
  questionId,
  connections
})
module.exports.setSelectedConnections = setSelectedConnections

const UPDATE_CONNECTIONS_SEARCH_QUERY = 'UPDATE_CONNECTIONS_SEARCH_QUERY'
module.exports.UPDATE_CONNECTIONS_SEARCH_QUERY = UPDATE_CONNECTIONS_SEARCH_QUERY

const updateConnectionsSearchQuery = query => ({
  type: UPDATE_CONNECTIONS_SEARCH_QUERY,
  query
})
module.exports.updateConnectionsSearchQuery = updateConnectionsSearchQuery

module.exports.saveSurveyAnswers = questionId => async (dispatch, getState) => {
  const state = getState()
  const survey = get(state, 'app.user.hirer.company.survey', {})
  const section = get(survey, 'section')
  const question = get(section, 'question')
  const { connectionsChanged } = state.surveyQuestionPage

  let newSelectedConnections = get(state, `surveyQuestionPage.selectedConnections[${questionId}]`, [])

  /**
   * TODO:
   * DRY up saved connections getting with /survey-question/index.js
   */
  if (!connectionsChanged) {
    const savedConnections = getSavedSurveyQuestionConnections(
      get(question, 'id'),
      get(state, 'app.surveyAnswers', [])
    )
    newSelectedConnections = uniq(newSelectedConnections.concat(savedConnections))
  }

  console.log('newSelectedConnections')

  try {
    await dispatch(
      actions.app.postData(
        {
          url: `/surveys/${survey.slug}/sections/${section.id}/connections/${
            question.id
          }`,
          method: 'post',
          data: {
            surveyQuestion: questionId,
            connections: newSelectedConnections
          }
        }
      )
    )

    return dispatch(submitConnectionsQuestionAnswers())
  } catch (e) {
    console.error(e)
  }
}

module.exports.search = (search = '') => (dispatch, getState) => {
  const state = getState()
  const survey = get(state, 'app.user.hirer.company.survey', {})
  const section = get(survey, 'section')
  const question = get(section, 'question')

  return dispatch(
    actions.app.postData(
      {
        url: `/surveys/${survey.slug}/sections/${section.id}/connections/${question.id}`,
        method: 'get',
        params: { search }
      }
    )
  )
}

module.exports.SHOW_ADD_FORM = `${PREFIX}_SHOW_ADD_FORM`
module.exports.showAddForm = () => ({
  type: module.exports.SHOW_ADD_FORM
})

module.exports.HIDE_ADD_FORM = `${PREFIX}_HIDE_ADD_FORM`
module.exports.hideAddForm = () => ({
  type: module.exports.HIDE_ADD_FORM
})

module.exports.CLEAR_ADD_FORM = `${PREFIX}_CLEAR_ADD_FORM`
module.exports.clearAddForm = () => ({
  type: module.exports.CLEAR_ADD_FORM
})

module.exports.submitNewConnection = () => (dispatch, getState) => {
  const state = getState()
  const survey = get(state, 'app.user.hirer.company.survey', {})
  const section = get(survey, 'section')
  const question = get(section, 'question')
  const data = get(state, 'surveyQuestionPage.newConnection')
  const connectionsAlreadyChanged = get(state, 'surveyQuestionPage.connectionsChanged')
  const csrfToken = get(state, 'app.csrfToken')

  let newSelectedConnections = get(state, 'surveyQuestionPage.selectedConnections', [])

  if (!connectionsAlreadyChanged) {
    const savedConnections = getSavedSurveyQuestionConnections(
      get(question, 'id'),
      get(state, 'app.surveyAnswers', [])
    )

    newSelectedConnections = uniq(newSelectedConnections.concat(savedConnections))
  }

  return axios({
    url: `/surveys/${survey.slug}/sections/${section.id}/connections/${question.id}/newConnection/json`,
    method: 'post',
    headers: {
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'X-CSRF-TOKEN': csrfToken
    },
    data
  })
  .then(response => {
    dispatch(module.exports.hideAddForm())
    dispatch(module.exports.clearAddForm())
    dispatch(setSelectedConnections(
      newSelectedConnections.concat(response.data.app.user.newConnection.id)
    ))
    dispatch(actions.app.showNotification({
      type: 'success',
      message: 'Person added'
    }))
  })
}

const SUBMIT_CONNECTIONS_QUESTION_ANSWERS = 'SUBMIT_CONNECTIONS_QUESTION_ANSWERS'
const submitConnectionsQuestionAnswers = () => ({
  type: SUBMIT_CONNECTIONS_QUESTION_ANSWERS
})

module.exports.SUBMIT_CONNECTIONS_QUESTION_ANSWERS = SUBMIT_CONNECTIONS_QUESTION_ANSWERS
module.exports.submitConnectionsQuestionAnswers = submitConnectionsQuestionAnswers
