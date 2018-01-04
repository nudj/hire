const { merge } = require('@nudj/library')
const get = require('lodash/get')
const without = require('lodash/without')
const concat = require('lodash/concat')
const { createReducer } = require('../../lib')
const {
  SET_NEW_ITEM_VALUE,
  ADD_CONNECTION,
  ADD_FORMER_EMPLOYER,
  TOGGLE_CONNECTION,
  UPDATE_CONNECTIONS_SEARCH_QUERY
} = require('./actions')

const setNewItemValue = (state, action) => {
  return merge(state, {
    [action.name]: {
      [action.key]: action.value
    }
  })
}

const toggleConnection = (state, action) => {
  let selectedConnections = concat(
    state.selectedConnections,
    action.connectionId
  )
  if (state.selectedConnections.includes(action.connectionId)) {
    selectedConnections = without(
      state.selectedConnections,
      action.connectionId
    )
  }
  return { ...state, selectedConnections }
}

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

const addFormerEmployer = (state, action) =>
  Object.assign({}, state, {
    formerEmployers: get(state, 'formerEmployers', []).concat(action.newItem),
    newFormerEmployer: {}
  })

const updateConnectionsSearchQuery = (state, { query }) => ({
  ...state,
  searchQuery: query
})

const reducers = {
  [SET_NEW_ITEM_VALUE]: setNewItemValue,
  [TOGGLE_CONNECTION]: toggleConnection,
  [ADD_FORMER_EMPLOYER]: addFormerEmployer,
  [ADD_CONNECTION]: addConnection,
  [UPDATE_CONNECTIONS_SEARCH_QUERY]: updateConnectionsSearchQuery
}

const initialState = {
  selectedConnections: [],
  newFormerEmployer: {},
  formerEmployers: [],
  newConnection: {},
  connections: [],
  searchQuery: null
}

module.exports = createReducer(initialState, reducers)
