const { merge } = require('@nudj/library')
const { TOGGLE_COMPLETED } = require('./actions')
const { createReducer } = require('../../lib')

const toggleCompleted = state => {
  return merge(state, {
    completedVisible: !state.completedVisible
  })
}

const reducers = {
  [TOGGLE_COMPLETED]: toggleCompleted
}

const initialState = {
  completedVisible: false
}

module.exports = createReducer(initialState, reducers)
