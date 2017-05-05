let {
  SET_JOB
} = require('../actions/app')

const initialState = {}

function pageReducer (state = initialState, action) {
  switch (action.type) {
    case SET_JOB:
      return state
    default:
      return state
  }
}

module.exports = {
  pageReducer
}
