const { merge } = require('@nudj/library')
const RouteParser = require('route-parser')

const {
  SET_VALUE,
  SET_CONNECTIONS
} = require('./actions')
const ROUTER_LOCATION_CHANGE = '@@router/LOCATION_CHANGE'
const importRoute = new RouteParser('/connections/import')

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

const routerLocationChange = (state, action) => {
  const baseImportUrlSegments = action.payload.pathname.split('/').slice(0, 3).join('/')
  if (importRoute.match(baseImportUrlSegments)) {
    return state
  }
  return merge(state, initialState)
}

const actions = {
  [SET_VALUE]: setValue,
  [SET_CONNECTIONS]: setConnections,
  [ROUTER_LOCATION_CHANGE]: routerLocationChange
}

const initialState = {
  connections: [],
  parsing: false
}

const reducer = (state = initialState, action) => {
  const type = action.type
  return actions[type] ? actions[type](state, action) : state
}

module.exports = reducer
