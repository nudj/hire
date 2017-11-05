const reject = require('lodash/reject')
const concat = require('lodash/concat')
const { merge } = require('@nudj/library')
const RouteParser = require('route-parser')

const {
  SET_VALUE,
  SET_ANSWER,
  TOGGLE_ANSWER
} = require('./actions')
const ROUTER_LOCATION_CHANGE = '@@router/LOCATION_CHANGE'
const surveyRoute = new RouteParser('/surveys/:surveySlug')

const removeFromArray = (arr, itemToRemove) => reject(arr, item => itemToRemove === item)
const addToArray = concat
const filterFormByResets = (survey, resets) => {
  resets.forEach((field) => Reflect.deleteProperty(survey, field))
  return survey
}

const setValue = (state, action) => {
  return merge(state, {
    [action.name]: action.value
  })
}

const setAnswer = (state, action) => {
  state.answers = filterFormByResets(state.answers, action.resets)
  state.answers[action.name] = action.value
  return merge(state)
}

const toggleAnswer = (state, action) => {
  const modifierFunction = action.toggle ? addToArray : removeFromArray
  state.answers = filterFormByResets(state.answers, action.resets)
  state.answers[action.name] = modifierFunction(state.answers[action.name] || [], action.value)
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
  [SET_ANSWER]: setAnswer,
  [TOGGLE_ANSWER]: toggleAnswer,
  [ROUTER_LOCATION_CHANGE]: routerLocationChange
}

const initialState = {
  step: 0,
  answers: {},
  connections: null
}

const reducer = (state = initialState, action) => {
  const type = action.type
  return actions[type] ? actions[type](state, action) : state
}

module.exports = reducer
