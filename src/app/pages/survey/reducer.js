const { merge } = require('@nudj/library')
const RouteParser = require('route-parser')

const {
  SET_VALUE,
  SET_NEW_CONNECTION_VALUE,
  ADD_CONNECTION,
  TOGGLE_CONNECTION
} = require('./actions')
const ROUTER_LOCATION_CHANGE = '@@router/LOCATION_CHANGE'
const surveyRoute = new RouteParser('/surveys/:surveySlug')

const setValue = (state, action) => {
  return merge(state, {
    [action.name]: action.value
  })
}

const setNewConnectionValue = (state, action) => {
  state.newConnection[action.name] = action.value
  return merge(state)
}

const addConnection = (state, action) => {
  let connections = state.connections || []
  connections = connections.concat(action.newConnection)
  state.connections = connections

  let questionConnections = state.questions[action.questionId] || []
  questionConnections = questionConnections.concat(action.newConnection.id)
  state.questions[action.questionId] = questionConnections

  state.newConnection = {}

  return merge(state)
}

const toggleConnection = (state, action) => {
  let questionConnections = state.questions[action.questionId] || []
  if (action.value) {
    if (!questionConnections.some(id => id === action.connectionId)) {
      questionConnections = questionConnections.concat(action.connectionId)
    }
  } else {
    questionConnections = questionConnections.filter(id => id !== action.connectionId)
  }
  state.questions[action.questionId] = questionConnections
  return merge(state)
}

const routerLocationChange = (state, action) => {
  if (surveyRoute.match(action.payload.pathname)) {
    return state
  }
  return merge(initialState)
}

const actions = {
  [SET_VALUE]: setValue,
  [SET_NEW_CONNECTION_VALUE]: setNewConnectionValue,
  [ADD_CONNECTION]: addConnection,
  [ROUTER_LOCATION_CHANGE]: routerLocationChange,
  [TOGGLE_CONNECTION]: toggleConnection
}

const initialState = {
  step: 0,
  newConnection: {},
  questions: {},
  connections: []
}

const reducer = (state = initialState, action) => {
  const type = action.type
  return actions[type] ? actions[type](state, action) : state
}

module.exports = reducer
