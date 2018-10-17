const { createReducer } = require('../../lib')
const {
  SET_FIELD_VALUE,
  SHOW_DELETE_MODAL,
  RESET_FORM
} = require('./actions')

const setFieldValue = (state, action) => ({
  ...state,
  fieldValues: {
    ...state.fieldValues,
    [action.key]: action.value
  }
})

const showDeleteModal = (state, action) => ({
  ...state,
  deleteModalVisible: action.show
})

const resetForm = state => initialState

const reducers = {
  [SET_FIELD_VALUE]: setFieldValue,
  [SHOW_DELETE_MODAL]: showDeleteModal,
  [RESET_FORM]: resetForm
}

const initialState = {
  fieldValues: {},
  deleteModalVisible: false
}

module.exports = createReducer(initialState, reducers)
