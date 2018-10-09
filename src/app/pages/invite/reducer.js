const { createReducer } = require('../../lib')
const {
  SET_NESTED_FIELD_VALUE,
  SET_VALUE,
  ADD_ADDITIONAL_FIELD,
  RESET_FORM,
  SHOW_LOADING
} = require('./actions')

const setValue = (state, action) => ({
  ...state,
  [action.key]: action.value
})

const setNestedFieldValue = (state, action) => ({
  ...state,
  fieldValues: {
    ...state.fieldValues,
    [action.person]: {
      ...state.fieldValues[action.person],
      [action.key]: action.value
    }
  }
})

const addAdditionalField = state => ({
  ...state,
  fieldCount: state.fieldCount + 1
})

const showLoading = state => ({
  loading: true
})

const resetForm = state => initialState

const reducers = {
  [SET_NESTED_FIELD_VALUE]: setNestedFieldValue,
  [SET_VALUE]: setValue,
  [ADD_ADDITIONAL_FIELD]: addAdditionalField,
  [SHOW_LOADING]: showLoading,
  [RESET_FORM]: resetForm
}

const initialState = {
  fieldValues: {},
  fieldCount: 5,
  loading: false,
  hasCopied: false
}

module.exports = createReducer(initialState, reducers)
