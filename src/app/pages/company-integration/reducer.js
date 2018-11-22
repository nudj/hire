const { createReducer } = require('../../lib')
const {
  SET_FIELD_VALUE,
  RESET_FORM,
  HIDE_ERROR,
  RESET_ERRORS,
  INITIALISE_VALUES,
  START_SYNCING,
  STOP_SYNCING,
  SHOW_MODAL,
  HIDE_MODAL
} = require('./actions')

const setFieldValue = (state, action) => ({
  ...state,
  fieldValues: {
    ...state.fieldValues,
    [action.key]: action.value
  }
})

const resetForm = () => initialState

const showModal = state => ({
  ...state,
  showModal: true
})

const hideModal = state => ({
  ...state,
  showModal: false
})

const startSyncing = (state, action) => ({
  ...state,
  syncing: true
})

const stopSyncing = (state, action) => ({
  ...state,
  syncing: false
})

const removeError = (state, action) => ({
  ...state,
  hiddenErrorFields: state.hiddenErrorFields.concat(action.field)
})

const resetErrors = (state, action) => ({
  ...state,
  hiddenErrorFields: initialState.hiddenErrorFields
})

const initialiseValues = (state, action) => ({
  ...state,
  fieldValues: {
    ...action.values
  },
  hiddenErrorFields: []
})

const reducers = {
  [SET_FIELD_VALUE]: setFieldValue,
  [RESET_FORM]: resetForm,
  [HIDE_ERROR]: removeError,
  [RESET_ERRORS]: resetErrors,
  [INITIALISE_VALUES]: initialiseValues,
  [START_SYNCING]: startSyncing,
  [STOP_SYNCING]: stopSyncing,
  [SHOW_MODAL]: showModal,
  [HIDE_MODAL]: hideModal
}

const initialState = {
  fieldValues: {},
  hiddenErrorFields: [],
  verifying: false,
  syncing: false,
  showModal: false
}

module.exports = createReducer(initialState, reducers)
