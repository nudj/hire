const { createReducer } = require('../../lib')
const { SET_LIST_ORDER } = require('./actions')

const setListOrder = (state, { reorderedList }) => ({
  ...state,
  reorderedList
})

const reducers = {
  [SET_LIST_ORDER]: setListOrder
}

const initialState = {}

module.exports = createReducer(initialState, reducers)
