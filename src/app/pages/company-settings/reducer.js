const { createReducer } = require('../../lib')
const { SET_FIELD_VALUE, INITIALISE_VALUES, RESET_FORM } = require('./actions')

const initialState = {
  fieldValues: {}
}

const setFieldValue = (state, action) => ({
  ...state,
  fieldValues: {
    ...state.fieldValues,
    [action.key]: action.value
  }
})

const initialiseValues = (state, action) => ({
  ...state,
  fieldValues: {
    ...action.values
  }
})

const resetForm = () => initialState

const reducers = {
  [SET_FIELD_VALUE]: setFieldValue,
  [INITIALISE_VALUES]: initialiseValues,
  [RESET_FORM]: resetForm
}

module.exports = createReducer(initialState, reducers)
