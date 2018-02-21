const { merge } = require('@nudj/library')
const get = require('lodash/get')
const RouteParser = require('route-parser')
const { createReducer } = require('../../lib')
const {
  SET_NEW_ITEM_VALUE,
  ADD_CONNECTION,
  ADD_FORMER_EMPLOYER,
  SET_SELECTED_CONNECTIONS,
  UPDATE_CONNECTIONS_SEARCH_QUERY,
  SHOW_ADD_FORM,
  HIDE_ADD_FORM,
  CLEAR_ADD_FORM,
  SUBMIT_CONNECTIONS_QUESTION_ANSWERS,
  START_LOADING,
  STOP_LOADING
} = require('./actions')

const ROUTER_LOCATION_CHANGE = '@@router/LOCATION_CHANGE'
const surveyRoute = new RouteParser('/surveys/:surveySlug/sections/:sectionId/:questionType/:questionId')

const setNewItemValue = (state, action) => {
  return merge(state, {
    [action.name]: {
      [action.key]: action.value
    }
  })
}

const setSelectedConnections = (state, action) => ({
  ...state,
  selectedConnections: {
    ...state.selectedConnections,
    [action.questionId]: action.connections
  },
  connectionsChanged: true
})

const addConnection = (state, action) => {
  const questions = merge(state.questions)
  const questionItems = get(questions, action.questionId, []).concat(
    action.newItem
  )
  questions[action.questionId] = questionItems

  return Object.assign({}, state, {
    connections: get(state, 'connections', []).concat(action.newItem),
    questions,
    newConnection: {}
  })
}

const addEmployment = (state, action) =>
  Object.assign({}, state, {
    employments: get(state, 'employments', []).concat(action.newItem),
    newEmployment: {}
  })

const updateConnectionsSearchQuery = (state, { query }) => ({
  ...state,
  searchQuery: query
})

const showAddForm = state => ({
  ...state,
  showAddIndividualConnectionModal: true
})

const hideAddForm = state => ({
  ...state,
  showAddIndividualConnectionModal: false
})

const clearAddForm = state => ({
  ...state,
  newConnection: {}
})

const resetConnectionsQuestionAnswers = (state, action) => {
  return {
    ...state,
    connections: [],
    searchQuery: null,
    newConnection: {},
    connectionsChanged: false
  }
}

/**
 * FIXME
 */
const handleLocationChange = (state, action) => {
  const questionId = get(surveyRoute.match(action.payload.pathname), 'questionId')

  if (state.questionId !== questionId) {
    return {
      ...state,
      questionId: questionId,
      searchQuery: null,
      connectionsChanged: false
    }
  }

  return {
    ...state,
    searchQuery: null
  }
}

const startLoading = state => {
  return {
    ...state,
    loading: true
  }
}

const stopLoading = state => {
  return {
    ...state,
    loading: false
  }
}

const reducers = {
  [SET_NEW_ITEM_VALUE]: setNewItemValue,
  [ADD_FORMER_EMPLOYER]: addEmployment,
  [ADD_CONNECTION]: addConnection,
  [UPDATE_CONNECTIONS_SEARCH_QUERY]: updateConnectionsSearchQuery,
  [SET_SELECTED_CONNECTIONS]: setSelectedConnections,
  [SHOW_ADD_FORM]: showAddForm,
  [HIDE_ADD_FORM]: hideAddForm,
  [CLEAR_ADD_FORM]: clearAddForm,
  [SUBMIT_CONNECTIONS_QUESTION_ANSWERS]: resetConnectionsQuestionAnswers,
  [ROUTER_LOCATION_CHANGE]: handleLocationChange,
  [START_LOADING]: startLoading,
  [STOP_LOADING]: stopLoading
}

const initialState = {
  selectedConnections: {},
  newEmployment: {},
  employments: [],
  newConnection: {},
  connections: [],
  searchQuery: null,
  connectionsChanged: false,
  questionId: null,
  loading: false,
  showAddIndividualConnectionModal: false
}

module.exports = createReducer(initialState, reducers)
