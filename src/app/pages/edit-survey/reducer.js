const { createReducer } = require('../../lib')
const {
  SET_FIELD_VALUE,
  RESET_FORM
} = require('./actions')

const setFieldValue = (state, action) => ({
  ...state,
  fieldValues: {
    ...state.fieldValues,
    [action.key]: action.value
  }
})

const resetForm = state => initialState

const reducers = {
  [SET_FIELD_VALUE]: setFieldValue,
  [RESET_FORM]: resetForm
}

const initialState = {
  fieldValues: {}
}

module.exports = createReducer(initialState, reducers)
