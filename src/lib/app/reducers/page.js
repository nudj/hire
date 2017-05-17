let {
  FETCHED_PAGE
} = require('../actions/app')

const initialState = {}

function pageReducer (state = initialState, action) {
  switch (action.type) {
    case FETCHED_PAGE:
      return action.page
    default:
      return state
  }
}

module.exports = {
  pageReducer
}
