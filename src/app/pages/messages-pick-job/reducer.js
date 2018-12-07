const { merge } = require('@nudj/library')
const {
  SELECT_JOB
} = require('./actions')
const { createReducer } = require('../../lib')

const ROUTER_LOCATION_CHANGE = '@@router/LOCATION_CHANGE'

const initialState = {
  jobId: null
}

const selectJob = (state, action) => {
  return merge(state, {
    jobId: action.id
  })
}

const handleLocationChange = () => initialState

const reducers = {
  [SELECT_JOB]: selectJob,
  [ROUTER_LOCATION_CHANGE]: handleLocationChange
}

module.exports = createReducer(initialState, reducers)
