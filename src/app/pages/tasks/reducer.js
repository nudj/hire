const { merge } = require('@nudj/library')
const { TOGGLE_COMPLETED } = require('./actions')
const { reducerBuilder } = require('../../lib')

const toggleCompleted = (state) => {
  return merge(state, {
    completedVisible: !state.completedVisible
  })
}

const actions = {
  [TOGGLE_COMPLETED]: toggleCompleted
}

const initialState = {
  completedVisible: false
}

module.exports = reducerBuilder(initialState, actions)
