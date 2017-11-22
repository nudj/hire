const { merge } = require('@nudj/library')
const RouteParser = require('route-parser')
const { reducerBuilder } = require('../../lib')

const { SET_ACTIVE } = require('./actions')
const ROUTER_LOCATION_CHANGE = '@@router/LOCATION_CHANGE'
const importRoute = new RouteParser('/connections/import')
const onboardingRoute = new RouteParser('/onboarding/import')

const setActive = (state, action) => {
  return merge(state, {
    active: action.active
  })
}

const routerLocationChange = (state, action) => {
  const baseImportUrlSegments = action.payload.pathname.split('/').slice(0, 3).join('/')
  if (importRoute.match(baseImportUrlSegments) || onboardingRoute.match(baseImportUrlSegments)) {
    return state
  }
  return merge(state, initialState)
}

const actions = {
  [SET_ACTIVE]: setActive,
  [ROUTER_LOCATION_CHANGE]: routerLocationChange
}

const initialState = {
  active: 0
}

module.exports = reducerBuilder(initialState, actions)
