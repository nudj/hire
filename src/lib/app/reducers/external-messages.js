const camelCase = require('lodash/camelCase')
const isNil = require('lodash/isNil')
const { merge } = require('@nudj/library')
const RouteParser = require('route-parser')

const savedExternalMessageRoute = new RouteParser('/jobs/:jobSlug/external/:messageId')

const setActiveStep = (state, action) => {
  const {
    active,
    confirm,
    resets
  } = action
  return merge(state, {
    active,
    confirm
  }, resets)
}

const setStepData = (state, action) => {
  return merge(state, {
    [action.stepName]: action.stepData
  })
}

const saveStepData = (state, action) => {
  if (!isNil(state.active)) {
    state.active = state.active + 1
  }
  delete state[action.stepName]
  return state
}

const hideConfirm = (state, action) => {
  return merge(state, {
    confirm: null
  })
}

const routerLocationChange = (state, action) => {
  if (savedExternalMessageRoute.match(action.payload.pathname)) {
    return state
  }
  return { active: null }
}

const actions = {
  setActiveStep,
  setStepData,
  saveStepData,
  hideConfirm,
  routerLocationChange
}

const initialState = {
  active: null,
  confirm: null
}

const externalMessagesReducer = (data) => {
  return (state = initialState, action) => {
    const type = camelCase(action.type)
    return actions[type] ? actions[type](state, action) : state
  }
}

module.exports = {
  externalMessagesReducer
}
