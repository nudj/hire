const { createReducer } = require('../../lib')
const {
  SET_FIELD_VALUE,
  SET_FIELD_VALUES,
  RESET_FORM
} = require('./actions')

/**
 * setFieldValue is an anti pattern as it returns a new object for ALL
 * values every time it's fired
 */
const setFieldValue = (state, action) => ({
  ...state,
  fieldValues: {
    ...state.fieldValues,
    [action.key]: action.value
  }
})

const setFieldValues = (state, action) => ({
  ...state,
  fieldValues: {
    ...state.fieldValues,
    ...action.values
  }
})

const resetForm = () => initialState

const reducers = {
  [SET_FIELD_VALUE]: setFieldValue,
  [SET_FIELD_VALUES]: setFieldValues,
  [RESET_FORM]: resetForm
}

const initialState = {
  fieldValues: {
    currencyValue: 'GBP',
    inputValue: '500'
  }
}

module.exports = createReducer(initialState, reducers)
