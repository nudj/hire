const { createReducer } = require('../../../lib')
const {
  START_PARSING_LINKEDIN_CONNECTIONS,
  COMPLETE_PARSING_LINKEDIN_CONNECTIONS,
  START_CONNECTIONS_UPLOAD,
  COMPLETE_CONNECTIONS_UPLOAD
} = require('./actions')

const initialState = {
  connections: [],
  parsing: false,
  loading: false
}

const startParsing = state => ({
  ...state,
  parsing: true
})

const stopParsing = (state, action) => ({
  ...state,
  connections: action.connections,
  parsing: false
})

const startLoading = state => ({
  ...state,
  loading: true
})

const stopLoading = state => ({
  ...state,
  loading: false
})

const reducers = {
  [START_PARSING_LINKEDIN_CONNECTIONS]: startParsing,
  [COMPLETE_PARSING_LINKEDIN_CONNECTIONS]: stopParsing,
  [START_CONNECTIONS_UPLOAD]: startLoading,
  [COMPLETE_CONNECTIONS_UPLOAD]: stopLoading
}

module.exports = createReducer(initialState, reducers)
