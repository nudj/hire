const TOGGLE_DROPDOWN = 'TOGGLE_DROPDOWN'

const toggleDropdown = dropdownId => ({
  type: TOGGLE_DROPDOWN,
  dropdownId
})

module.exports = {
  // Action types
  TOGGLE_DROPDOWN,
  // Action creators
  toggleDropdown
}
