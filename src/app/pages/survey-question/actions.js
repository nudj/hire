const axios = require('axios')
const get = require('lodash/get')
const actions = require('@nudj/framework/actions')

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

const setSelectedConnections = (connections) => ({
  type: SET_SELECTED_CONNECTIONS,
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

module.exports.search = () => (dispatch, getState) => {
  const state = getState()
  const survey = get(state, 'app.user.hirer.company.survey', {})
  const section = get(survey, 'section')
  const question = get(section, 'question')
  const search = get(state, 'surveyQuestionPage.searchQuery') || ''

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
  const csrfToken = get(state, 'app.csrfToken')

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
    const selectedConnections = get(state, 'surveyQuestionPage.selectedConnections')
    dispatch(setSelectedConnections(selectedConnections.concat(response.data.app.user.newConnection.id)))
    dispatch(module.exports.clearAddForm())
  })
}
