const { merge } = require('@nudj/library')
const RouteParser = require('route-parser')
const { createReducer } = require('../../lib')

const { SET_VALUE, SET_CONNECTIONS } = require('./actions')
const ROUTER_LOCATION_CHANGE = '@@router/LOCATION_CHANGE'
const importRoute = new RouteParser('/connections/import')
const onboardingRoute = new RouteParser('/onboarding/import')

const setValue = (state, action) => {
  return merge(state, {
    [action.key]: action.value
  })
}

const setConnections = (state, action) => {
  return merge(state, {
    connections: action.connections,
    parsing: false
  })
}

const reducers = {
  [SET_VALUE]: setValue,
  [SET_CONNECTIONS]: setConnections
}

const initialState = {
  connections: [],
  parsing: false
}

module.exports = createReducer(initialState, reducers)
