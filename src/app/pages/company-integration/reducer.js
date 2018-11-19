const { createReducer } = require('../../lib')
const {
  SET_FIELD_VALUE,
  RESET_FORM,
  REMOVE_ERRORS,
  INITIALISE_VALUES,
  SET_ERRORED_FIELD,
  START_LOADING,
  STOP_LOADING
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

const startLoading = (state, action) => ({
  ...state,
  loading: true
})

const stopLoading = (state, action) => ({
  ...state,
  loading: false
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
  [START_LOADING]: startLoading,
  [STOP_LOADING]: stopLoading
}

const initialState = {
  fieldValues: {},
  errors: {},
  loading: false
}

module.exports = createReducer(initialState, reducers)
