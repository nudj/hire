const { createReducer } = require('../../../lib')
const { TOGGLE_DROPDOWN } = require('../../actions/dropdowns')

const initialState = {
  activeDropdown: null
}

const reducers = {
  [TOGGLE_DROPDOWN]: (state, { dropdownId }) => ({
    ...state,
    activeDropdown: state.activeDropdown === dropdownId ? null : dropdownId
  })
}

module.exports = createReducer(initialState, reducers)
