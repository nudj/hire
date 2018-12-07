const { merge } = require('@nudj/library')
const {
  UPDATE_SUBJECT,
  UPDATE_MESSAGE,
  SEND_MESSAGE
} = require('./actions')
const { createReducer } = require('../../lib')

const updateSubject = (state, action) => {
  return merge(state, {
    subject: action.subject
  })
}

const updateMessage = (state, action) => {
  return merge(state, {
    message: action.message
  })
}

const startLoading = state => {
  return merge(state, {
    loading: true
  })
}

const reducers = {
  [UPDATE_SUBJECT]: updateSubject,
  [UPDATE_MESSAGE]: updateMessage,
  [SEND_MESSAGE]: startLoading
}

const initialState = {
  subject: null,
  message: null,
  loading: false
}

module.exports = createReducer(initialState, reducers)
