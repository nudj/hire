const { merge } = require('@nudj/library')
const { SELECT_JOB } = require('./actions')
const { createReducer } = require('../../lib')

const selectJob = (state, action) => {
  return merge(state, {
    jobId: action.id
  })
}

const reducers = {
  [SELECT_JOB]: selectJob
}

const initialState = {
  jobId: null
}

module.exports = createReducer(initialState, reducers)
