const isNil = require('lodash/isNil')
const { merge } = require('@nudj/library')
const RouteParser = require('route-parser')
const {
  SET_ACTIVE_STEP,
  SET_STEP_DATA,
  SAVE_STEP_DATA,
  HIDE_CONFIRM,
  SET_MESSAGE_DRAFT
} = require('./actions')

const ROUTER_LOCATION_CHANGE = '@@router/LOCATION_CHANGE'
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

const setMessageDraft = (state, action) => {
  return merge(state, { draft: action.body })
}

const actions = {
  [SET_ACTIVE_STEP]: setActiveStep,
  [SET_STEP_DATA]: setStepData,
  [SAVE_STEP_DATA]: saveStepData,
  [HIDE_CONFIRM]: hideConfirm,
  [ROUTER_LOCATION_CHANGE]: routerLocationChange,
  [SET_MESSAGE_DRAFT]: setMessageDraft
}

const initialState = {
  active: null,
  confirm: null
}

const reducer = (state = initialState, action) => {
  const type = action.type
  return actions[type] ? actions[type](state, action) : state
}

module.exports = reducer
