let {
  FETCHED_PAGE,
  SHOW_DIALOG,
  HIDE_DIALOG
} = require('../actions/app')
const { merge } = require('../lib')

const initialState = {}

function pageReducer (state = initialState, action) {
  switch (action.type) {
    case FETCHED_PAGE:
      return action.data.page
    case SHOW_DIALOG:
      return merge(state, { overlay: action.dialog })
    case HIDE_DIALOG:
      return merge(state, { overlay: undefined })
    default:
      return state
  }
}

module.exports = {
  pageReducer
}
