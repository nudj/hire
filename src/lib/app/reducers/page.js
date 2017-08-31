let {
  SENDING,
  FETCHED_PAGE,
  SHOW_DIALOG,
  HIDE_DIALOG,
  SHOW_LOADING,
  SHOW_NOTIFICATION,
  HIDE_NOTIFICATION,
  CONFIRM_STEP,
  EXTERNAL_MESSAGE_CONFIRM
} = require('../actions/app')
const { merge } = require('@nudj/library')

const initialState = {
  externalMessageActive: 0
}

function pageReducer (state = initialState, action) {
  switch (action.type) {
    case SENDING:
      return merge(state, { sending: true, notification: null })
    case SHOW_LOADING:
      return merge(state, { loading: true })
    case FETCHED_PAGE:
      return merge(action.data.page, {
        sending: false,
        loading: false,
        // ensure notifications persist through multiple fetches (should only be dismissable by the user)
        notification: action.data.page.notification || state.notification
      })
    case SHOW_DIALOG:
      return merge(state, { overlay: action.overlay })
    case HIDE_DIALOG:
      return merge(state, { overlay: null })
    case SHOW_NOTIFICATION:
      return merge(state, { notification: merge(action.notification, { hide: false }) })
    case HIDE_NOTIFICATION:
      return merge(state, { notification: { hide: true } })
    case CONFIRM_STEP:
      return merge(state, { overlay: null })
    case EXTERNAL_MESSAGE_CONFIRM:
      return merge(state, {
        overlay: null
      })
    default:
      return state
  }
}

module.exports = {
  pageReducer
}
