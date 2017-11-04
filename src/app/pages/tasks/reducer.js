const { merge } = require('@nudj/library')
const { TOGGLE_COMPLETED } = require('./actions')

const toggleCompleted = (state, action) => {
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

const reducer = (state = initialState, action) => {
  const type = action.type
  return actions[type] ? actions[type](state, action) : state
}

module.exports = reducer
