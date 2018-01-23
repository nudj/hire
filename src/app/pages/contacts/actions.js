const PREFIX = 'SURVEY'

const UPDATE_CONTACT_SEARCH_QUERY = 'UPDATE_CONTACT_SEARCH_QUERY'
const SET_SELECTED_CONTACTS = 'SET_SELECTED_CONTACTS'
const SHOW_ADD_FORM = `${PREFIX}_SHOW_ADD_FORM`

const updateContactsSearchQuery = (query) => ({
  type: UPDATE_CONTACT_SEARCH_QUERY,
  query
})

const setSelectedContacts = (contacts) => ({
  type: SET_SELECTED_CONTACTS,
  contacts
})

const showAddForm = () => ({
  type: module.exports.SHOW_ADD_FORM
})

module.exports = {
  // constants
  UPDATE_CONTACT_SEARCH_QUERY,
  SET_SELECTED_CONTACTS,
  SHOW_ADD_FORM,
  // action creators
  updateContactsSearchQuery,
  setSelectedContacts,
  showAddForm
}
