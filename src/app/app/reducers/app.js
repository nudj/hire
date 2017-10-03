let {
  SHOW_ERROR,
  FETCHED_PAGE,
  SHOW_DIALOG,
  HIDE_DIALOG,
  SHOW_LOADING,
  SHOW_NOTIFICATION,
  HIDE_NOTIFICATION,
  SAVE_STEP_DATA
} = require('../actions/app')
const { merge } = require('@nudj/library')

const initialState = {}
const resetError = {
  error: null
}

function appReducer (state = initialState, action) {
  switch (action.type) {
    case SHOW_ERROR:
      return { error: { code: 500 } }
    case SHOW_LOADING:
      return merge(state, resetError, { loading: true })
    case FETCHED_PAGE:
      return merge(action.data.app, {
        loading: false,
        // ensure notifications persist through multiple fetches (should only be dismissable by the user or on timeout)
        notification: action.data.app.notification || state.notification
      })
    case SHOW_DIALOG:
      return merge(state, resetError, { overlay: action.actions })
    case HIDE_DIALOG:
    case SAVE_STEP_DATA:
      return merge(state, resetError, { overlay: null })
    case SHOW_NOTIFICATION:
      return merge(state, resetError, { notification: merge(action.notification, { hide: false }) })
    case HIDE_NOTIFICATION:
      return merge(state, resetError, { notification: { hide: true } })
    default:
      return state
  }
}

module.exports = {
  appReducer
}