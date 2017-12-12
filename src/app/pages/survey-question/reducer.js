const { merge } = require('@nudj/library')
const RouteParser = require('route-parser')
const get = require('lodash/get')
const without = require('lodash/without')
const concat = require('lodash/concat')
const { reducerBuilder } = require('../../lib')
const {
  SET_NEW_ITEM_VALUE,
  ADD_CONNECTION,
  ADD_FORMER_EMPLOYER,
  TOGGLE_CONNECTION
} = require('./actions')

const ROUTER_LOCATION_CHANGE = '@@router/LOCATION_CHANGE'
const surveyRoute = new RouteParser('/surveys/:surveySlug')
const onboardingRoute = new RouteParser('/onboarding/surveys/:surveySlug')

const setNewItemValue = (state, action) => {
  return merge(state, {
    [action.name]: {
      [action.key]: action.value
    }
  })
}

const toggleConnection = (state, action) => {
  let selectedConnections = concat(state.selectedConnections, action.connectionId)
  if (state.selectedConnections.includes(action.connectionId)) {
    selectedConnections = without(state.selectedConnections, action.connectionId)
  }
  return Object.assign({}, state, { selectedConnections })
}

const addConnection = (state, action) => {
  const questions = merge(state.questions)
  const questionItems = get(questions, action.questionId, []).concat(action.newItem.id)
  questions[action.questionId] = questionItems

  return Object.assign({}, state, {
    connections: get(state, 'connections', []).concat(action.newItem),
    questions,
    newConnection: {}
  })
}

const addFormerEmployer = (state, action) => Object.assign({}, state, {
  formerEmployers: get(state, 'formerEmployers', []).concat(action.newItem),
  newFormerEmployer: {}
})

const routerLocationChange = (state, action) => {
  const baseSurveyUrlSegments = action.payload.pathname.split('/').slice(0, 3).join('/')
  if (surveyRoute.match(baseSurveyUrlSegments) || onboardingRoute.match(baseSurveyUrlSegments)) {
    return state
  }
  return merge(initialState)
}

const actions = {
  [SET_NEW_ITEM_VALUE]: setNewItemValue,
  [TOGGLE_CONNECTION]: toggleConnection,
  [ADD_FORMER_EMPLOYER]: addFormerEmployer,
  [ADD_CONNECTION]: addConnection,
  [ROUTER_LOCATION_CHANGE]: routerLocationChange
}

const initialState = {
  selectedConnections: [],
  newFormerEmployer: {},
  formerEmployers: [],
  newConnection: {},
  connections: []
}

module.exports = reducerBuilder(initialState, actions)
