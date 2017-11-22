const { merge } = require('@nudj/library')
const RouteParser = require('route-parser')
const get = require('lodash/get')
const { reducerBuilder } = require('../../lib')

const {
  SET_VALUE,
  SET_NEW_ITEM_VALUE,
  ADD_CONNECTION,
  ADD_FORMER_EMPLOYER,
  TOGGLE_ITEM
} = require('./actions')
const ROUTER_LOCATION_CHANGE = '@@router/LOCATION_CHANGE'
const surveyRoute = new RouteParser('/surveys/:surveySlug')
const onboardingRoute = new RouteParser('/onboarding/surveys/:surveySlug')

const setValue = (state, action) => {
  return merge(state, {
    [action.name]: action.value
  })
}

const setNewItemValue = (state, action) => {
  return merge(state, {
    [action.name]: {
      [action.key]: action.value
    }
  })
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

const toggleItem = (state, action) => {
  const questions = merge(state.questions)
  let questionItems = get(questions, action.questionId, [])
  if (action.value) {
    if (!questionItems.some(id => id === action.itemId)) {
      questionItems = questionItems.concat(action.itemId)
    }
  } else {
    questionItems = questionItems.filter(id => id !== action.itemId)
  }
  questions[action.questionId] = questionItems
  return Object.assign({}, state, { questions })
}

const routerLocationChange = (state, action) => {
  const baseSurveyUrlSegments = action.payload.pathname.split('/').slice(0, 3).join('/')
  if (surveyRoute.match(baseSurveyUrlSegments) || onboardingRoute.match(baseSurveyUrlSegments)) {
    return state
  }
  return merge(initialState)
}

const actions = {
  [SET_VALUE]: setValue,
  [SET_NEW_ITEM_VALUE]: setNewItemValue,
  [ADD_FORMER_EMPLOYER]: addFormerEmployer,
  [ADD_CONNECTION]: addConnection,
  [ROUTER_LOCATION_CHANGE]: routerLocationChange,
  [TOGGLE_ITEM]: toggleItem
}

const initialState = {
  step: 0,
  questions: {},
  newFormerEmployer: {},
  formerEmployers: [],
  newConnection: {},
  connections: []
}

module.exports = reducerBuilder(initialState, actions)
