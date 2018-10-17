const TOGGLE_DROPDOWN = 'TOGGLE_DROPDOWN'
const CLOSE_DROPDOWN = 'CLOSE_DROPDOWN'

const toggleDropdown = dropdownId => ({
  type: TOGGLE_DROPDOWN,
  dropdownId
})

const closeDropdown = () => ({
  type: CLOSE_DROPDOWN
})

module.exports = {
  // Action types
  TOGGLE_DROPDOWN,
  CLOSE_DROPDOWN,
  // Action creators
  toggleDropdown,
  closeDropdown
}
