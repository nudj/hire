const axios = require('axios')
const get = require('lodash/get')
const uniq = require('lodash/uniq')
const actions = require('@nudj/framework/actions')

const getSavedSurveyQuestionConnections = require('./getSavedSurveyQuestionConnections')

const ADD_CONNECTION = 'SURVEY_ADD_CONNECTION'
const SET_NEW_ITEM_VALUE = 'SURVEY_SET_NEW_ITEM_VALUE'
const ADD_FORMER_EMPLOYER = 'SURVEY_ADD_FORMER_EMPLOYER'
const SET_SELECTED_CONNECTIONS = 'SET_SELECTED_CONNECTIONS'
const UPDATE_CONNECTIONS_SEARCH_QUERY = 'SURVEY_UPDATE_CONNECTIONS_SEARCH_QUERY'
const START_LOADING = 'SURVEY_START_LOADING'
const STOP_LOADING = 'SURVEY_STOP_LOADING'
const CONNECTIONS_SEARCH = 'SURVEY_CONNECTIONS_SEARCH'
const SHOW_ADD_FORM = 'SURVEY_SHOW_ADD_FORM'
const HIDE_ADD_FORM = 'SURVEY_HIDE_ADD_FORM'
const CLEAR_ADD_FORM = 'SURVEY_CLEAR_ADD_FORM'
const SUBMIT_CONNECTIONS_QUESTION_ANSWERS = 'SUBMIT_CONNECTIONS_QUESTION_ANSWERS'

const setNewItemValue = (name, key, value) => ({
  type: SET_NEW_ITEM_VALUE,
  name,
  key,
  value
})

function addNewConnection (questionId, newItem) {
  return {
    type: ADD_CONNECTION,
    questionId,
    newItem
  }
}
const addConnection = questionId => (dispatch, getState) => {
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
        dispatch(addNewConnection(questionId, newConnection))
      }
    )
  )
}

const addNewEmployment = (questionId, newItem) => {
  return {
    type: ADD_FORMER_EMPLOYER,
    questionId,
    newItem
  }
}
const addEmployment = questionId => (dispatch, getState) => {
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
        dispatch(addNewEmployment(questionId, newEmployment))
      }
    )
  )
}

const setSelectedConnections = (questionId, connections) => ({
  type: SET_SELECTED_CONNECTIONS,
  questionId,
  connections
})

const updateConnectionsSearchQuery = query => ({
  type: UPDATE_CONNECTIONS_SEARCH_QUERY,
  query
})

const saveSurveyAnswers = questionId => async (dispatch, getState) => {
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

  const connectionIds = newSelectedConnections.map(connection => connection.id)

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
            connections: connectionIds
          }
        }
      )
    )

    return dispatch(submitConnectionsQuestionAnswers())
  } catch (e) {
    console.error(e)
  }
}

const startLoading = () => ({
  type: START_LOADING
})

const stopLoading = () => ({
  type: STOP_LOADING
})

const search = (search = '') => async (dispatch, getState) => {
  const state = getState()
  const survey = get(state, 'app.user.hirer.company.survey', {})
  const section = get(survey, 'section')
  const question = get(section, 'question')

  dispatch(startLoading())
  await dispatch(
    actions.app.postData(
      {
        url: `/surveys/${survey.slug}/sections/${section.id}/connections/${question.id}`,
        method: 'get',
        params: { search },
        showLoadingState: false
      }
    )
  )
  dispatch(stopLoading())
}

const showAddForm = () => ({
  type: SHOW_ADD_FORM
})

const hideAddForm = () => ({
  type: HIDE_ADD_FORM
})

const clearAddForm = () => ({
  type: CLEAR_ADD_FORM
})

const submitNewConnection = () => (dispatch, getState) => {
  const state = getState()
  const survey = get(state, 'app.user.hirer.company.survey', {})
  const section = get(survey, 'section')
  const question = get(section, 'question')
  const data = get(state, 'surveyQuestionPage.newConnection')
  const connectionsAlreadyChanged = get(state, 'surveyQuestionPage.connectionsChanged')
  const csrfToken = get(state, 'app.csrfToken')

  let newSelectedConnections = get(state, `surveyQuestionPage.selectedConnections[${question.id}]`, [])

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
    dispatch(hideAddForm())
    dispatch(clearAddForm())
    dispatch(setSelectedConnections(
      question.id,
      newSelectedConnections.concat(response.data.app.user.newConnection)
    ))
    dispatch(actions.app.showNotification({
      type: 'success',
      message: 'Person added'
    }))
  })
}

const submitConnectionsQuestionAnswers = () => ({
  type: SUBMIT_CONNECTIONS_QUESTION_ANSWERS
})

module.exports = {
  // constants
  START_LOADING,
  STOP_LOADING,
  CLEAR_ADD_FORM,
  HIDE_ADD_FORM,
  SHOW_ADD_FORM,
  CONNECTIONS_SEARCH,
  UPDATE_CONNECTIONS_SEARCH_QUERY,
  SET_SELECTED_CONNECTIONS,
  ADD_FORMER_EMPLOYER,
  ADD_CONNECTION,
  SET_NEW_ITEM_VALUE,
  SUBMIT_CONNECTIONS_QUESTION_ANSWERS,
  // action creators
  submitNewConnection,
  setSelectedConnections,
  updateConnectionsSearchQuery,
  clearAddForm,
  hideAddForm,
  showAddForm,
  search,
  startLoading,
  saveSurveyAnswers,
  addEmployment,
  addConnection,
  setNewItemValue,
  submitConnectionsQuestionAnswers
}
