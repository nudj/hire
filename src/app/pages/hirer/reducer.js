const { createReducer } = require('../../lib')
const {
  SHOW_DELETE_MODAL
} = require('./actions')

const showDeleteModal = (state, action) => ({
  ...state,
  deleteModalVisible: action.show
})

const reducers = {
  [SHOW_DELETE_MODAL]: showDeleteModal
}

const initialState = {
  deleteModalVisible: false
}

module.exports = createReducer(initialState, reducers)
