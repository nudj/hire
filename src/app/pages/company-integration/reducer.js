const { createReducer } = require('../../lib')
const {
  SET_FIELD_VALUE,
  RESET_FORM,
  INITIALISE_VALUES
} = require('./actions')

const setFieldValue = (state, action) => ({
  ...state,
  fieldValues: {
    ...state.fieldValues,
    [action.key]: action.value
  }
})

const resetForm = () => initialState

const initialiseValues = (state, action) => ({
  ...state,
  fieldValues: {
    ...action.values
  }
})

const reducers = {
  [SET_FIELD_VALUE]: setFieldValue,
  [RESET_FORM]: resetForm,
  [INITIALISE_VALUES]: initialiseValues
}

const initialState = {
  fieldValues: {}
}

module.exports = createReducer(initialState, reducers)
