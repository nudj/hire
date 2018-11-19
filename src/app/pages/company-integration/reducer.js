const { createReducer } = require('../../lib')
const {
  SET_FIELD_VALUE,
  RESET_FORM,
  REMOVE_ERRORS,
  INITIALISE_VALUES,
  SET_ERRORED_FIELD,
  START_VERIFYING,
  STOP_VERIFYING,
  START_SYNCING,
  STOP_SYNCING
} = require('./actions')

const setFieldValue = (state, action) => ({
  ...state,
  fieldValues: {
    ...state.fieldValues,
    [action.key]: action.value
  }
})

const setErroredField = (state, action) => ({
  ...state,
  errors: {
    ...state.errors,
    [action.key]: action.value
  }
})

const resetForm = () => initialState

const startVerifying = (state, action) => ({
  ...state,
  verifying: true
})

const stopVerifying = (state, action) => ({
  ...state,
  verifying: false
})

const startSyncing = (state, action) => ({
  ...state,
  syncing: true
})

const stopSyncing = (state, action) => ({
  ...state,
  syncing: false
})

const removeErrors = (state, action) => ({
  ...state,
  errors: initialState.errors
})

const initialiseValues = (state, action) => ({
  ...state,
  fieldValues: {
    ...action.values
  },
  errors: {}
})

const reducers = {
  [SET_FIELD_VALUE]: setFieldValue,
  [SET_ERRORED_FIELD]: setErroredField,
  [RESET_FORM]: resetForm,
  [REMOVE_ERRORS]: removeErrors,
  [INITIALISE_VALUES]: initialiseValues,
  [START_VERIFYING]: startVerifying,
  [STOP_VERIFYING]: stopVerifying,
  [START_SYNCING]: startSyncing,
  [STOP_SYNCING]: stopSyncing
}

const initialState = {
  fieldValues: {},
  errors: {},
  verifying: false,
  syncing: false
}

module.exports = createReducer(initialState, reducers)
