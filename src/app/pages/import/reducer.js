const { merge } = require('@nudj/library')
const RouteParser = require('route-parser')
const { reducerBuilder } = require('../../lib')

const { SET_NETWORK } = require('./actions')
const ROUTER_LOCATION_CHANGE = '@@router/LOCATION_CHANGE'
const importRoute = new RouteParser('/connections/import')
const onboardingRoute = new RouteParser('/onboarding/import')

const setNetwork = (state, action) => {
  return merge(state, {
    network: action.network
  })
}

const routerLocationChange = (state, action) => {
  const baseImportUrlSegments = action.payload.pathname.split('/').slice(0, 3).join('/')
  if (importRoute.match(baseImportUrlSegments) || onboardingRoute.match(baseImportUrlSegments)) {
    return state
  }
  return merge(initialState)
}

const actions = {
  [SET_NETWORK]: setNetwork,
  [ROUTER_LOCATION_CHANGE]: routerLocationChange
}

const initialState = {
  network: null
}

module.exports = reducerBuilder(initialState, actions)
