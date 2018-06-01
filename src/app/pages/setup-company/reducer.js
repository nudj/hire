const { createReducer } = require('../../lib')
const {
  SET_FIELD_VALUE,
  ADD_ADDITIONAL_FIELD,
  RESET_FORM
} = require('./actions')

const setFieldValue = (state, action) => ({
  ...state,
  fieldValues: {
    ...state.fieldValues,
    [action.key]: action.value
  }
})

const addAdditionalField = state => ({
  ...state,
  fieldCount: state.fieldCount + 1
})

const resetForm = state => initialState

const reducers = {
  [SET_FIELD_VALUE]: setFieldValue,
  [ADD_ADDITIONAL_FIELD]: addAdditionalField,
  [RESET_FORM]: resetForm
}

const initialState = {
  fieldValues: {}
}

module.exports = createReducer(initialState, reducers)
