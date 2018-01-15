const { merge } = require('@nudj/library')
const get = require('lodash/get')
const { createReducer } = require('../../lib')
const {
  SET_NEW_ITEM_VALUE,
  ADD_CONNECTION,
  ADD_FORMER_EMPLOYER,
  SET_SELECTED_CONNECTIONS,
  UPDATE_CONNECTIONS_SEARCH_QUERY,
  SHOW_ADD_FORM,
  HIDE_ADD_FORM
} = require('./actions')

const setNewItemValue = (state, action) => {
  return merge(state, {
    [action.name]: {
      [action.key]: action.value
    }
  })
}

const setSelectedConnections = (state, action) => ({
  ...state,
  selectedConnections: action.connections
})

const addConnection = (state, action) => {
  const questions = merge(state.questions)
  const questionItems = get(questions, action.questionId, []).concat(
    action.newItem.id
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
  addFormVisible: true
})

const hideAddForm = state => ({
  ...state,
  addFormVisible: false
})

const reducers = {
  [SET_NEW_ITEM_VALUE]: setNewItemValue,
  [ADD_FORMER_EMPLOYER]: addEmployment,
  [ADD_CONNECTION]: addConnection,
  [UPDATE_CONNECTIONS_SEARCH_QUERY]: updateConnectionsSearchQuery,
  [SET_SELECTED_CONNECTIONS]: setSelectedConnections,
  [SHOW_ADD_FORM]: showAddForm,
  [HIDE_ADD_FORM]: hideAddForm
}

const initialState = {
  selectedConnections: [],
  newEmployment: {},
  employments: [],
  newConnection: {},
  connections: [],
  searchQuery: null,
  addFormVisible: false
}

module.exports = createReducer(initialState, reducers)
