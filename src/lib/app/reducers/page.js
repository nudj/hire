let {
  SENDING,
  FETCHED_PAGE,
  SHOW_DIALOG,
  HIDE_DIALOG
} = require('../actions/app')
const { merge } = require('../../lib')

const initialState = {}

function pageReducer (state = initialState, action) {
  switch (action.type) {
    case SENDING:
      return merge(state, { sending: true })
    case FETCHED_PAGE:
      return merge(action.data.page, { sending: false })
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
