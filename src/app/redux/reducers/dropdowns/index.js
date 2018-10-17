const { createReducer } = require('../../../lib')
const {
  TOGGLE_DROPDOWN,
  CLOSE_DROPDOWN
} = require('../../actions/dropdowns')

const initialState = {
  activeDropdown: null
}

const reducers = {
  [TOGGLE_DROPDOWN]: (state, { dropdownId }) => ({
    ...state,
    activeDropdown: state.activeDropdown === dropdownId ? null : dropdownId
  }),
  [CLOSE_DROPDOWN]: state => ({
    ...state,
    activeDropdown: null
  })
}

module.exports = createReducer(initialState, reducers)
