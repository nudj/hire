const { merge } = require('@nudj/library')
const RouteParser = require('route-parser')

const {
  SET_VALUE,
  SET_NEW_ITEM_VALUE,
  ADD_CONNECTION,
  ADD_COMPANY,
  TOGGLE_ITEM
} = require('./actions')
const ROUTER_LOCATION_CHANGE = '@@router/LOCATION_CHANGE'
const surveyRoute = new RouteParser('/surveys/:surveySlug')

const setValue = (state, action) => {
  return merge(state, {
    [action.name]: action.value
  })
}

const setNewItemValue = (state, action) => {
  state[action.itemType][action.name] = action.value
  return merge(state)
}

const addConnection = (state, action) => {
  let connections = state.connections || []
  connections = connections.concat(action.newItem)
  state.connections = connections

  let questionItems = state.questions[action.questionId] || []
  questionItems = questionItems.concat(action.newItem.id)
  state.questions[action.questionId] = questionItems

  state.newConnection = {}

  return merge(state)
}

const addCompany = (state, action) => {
  let companies = state.companies || []
  companies = companies.concat(action.newItem)
  state.companies = companies

  state.newCompany = {}

  return merge(state)
}

const toggleItem = (state, action) => {
  let questionItems = state.questions[action.questionId] || []
  if (action.value) {
    if (!questionItems.some(id => id === action.itemId)) {
      questionItems = questionItems.concat(action.itemId)
    }
  } else {
    questionItems = questionItems.filter(id => id !== action.itemId)
  }
  state.questions[action.questionId] = questionItems
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
  [SET_NEW_ITEM_VALUE]: setNewItemValue,
  [ADD_COMPANY]: addCompany,
  [ADD_CONNECTION]: addConnection,
  [ROUTER_LOCATION_CHANGE]: routerLocationChange,
  [TOGGLE_ITEM]: toggleItem
}

const initialState = {
  step: 0,
  questions: {},
  newCompany: {},
  companies: [],
  newConnection: {},
  connections: []
}

const reducer = (state = initialState, action) => {
  const type = action.type
  return actions[type] ? actions[type](state, action) : state
}

module.exports = reducer
