const { createReducer } = require('../../lib')
const {
  SET_FIELD_VALUE,
  ADD_ADDITIONAL_FIELD,
  RESET_FORM,
  SHOW_LOADING
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

const showLoading = state => ({
  loading: true
})

const resetForm = state => initialState

const reducers = {
  [SET_FIELD_VALUE]: setFieldValue,
  [ADD_ADDITIONAL_FIELD]: addAdditionalField,
  [SHOW_LOADING]: showLoading,
  [RESET_FORM]: resetForm
}

const initialState = {
  fieldValues: {},
  fieldCount: 5,
  loading: false
}

module.exports = createReducer(initialState, reducers)
