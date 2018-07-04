const { createReducer } = require('../../lib')
const {
  SET_NESTED_FIELD_VALUE,
  ADD_ADDITIONAL_FIELD,
  RESET_FORM
} = require('./actions')

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

const resetForm = state => initialState

const reducers = {
  [SET_NESTED_FIELD_VALUE]: setNestedFieldValue,
  [ADD_ADDITIONAL_FIELD]: addAdditionalField,
  [RESET_FORM]: resetForm
}

const initialState = {
  fieldValues: {},
  fieldCount: 5,
  loading: false
}

module.exports = createReducer(initialState, reducers)
