const { merge } = require('@nudj/library')
const {
  SELECT_JOB,
  UPDATE_SUBJECT,
  UPDATE_MESSAGE,
  SEND_MESSAGE
} = require('./actions')
const { createReducer } = require('../../../lib')

const selectJob = (state, action) => {
  return merge(state, {
    jobId: action.id
  })
}

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
  [SELECT_JOB]: selectJob,
  [UPDATE_SUBJECT]: updateSubject,
  [UPDATE_MESSAGE]: updateMessage,
  [SEND_MESSAGE]: startLoading
}

const initialState = {
  jobId: null,
  subject: null,
  message: null,
  loading: false
}

module.exports = createReducer(initialState, reducers)
