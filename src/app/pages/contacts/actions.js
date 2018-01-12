const UPDATE_CONTACT_SEARCH_QUERY = 'UPDATE_CONTACT_SEARCH_QUERY'
const SET_SELECTED_CONTACTS = 'SET_SELECTED_CONTACTS'

const updateContactsSearchQuery = (query) => ({
  type: UPDATE_CONTACT_SEARCH_QUERY,
  query
})

const setSelectedContacts = (contacts) => ({
  type: SET_SELECTED_CONTACTS,
  contacts
})

module.exports = {
  // constants
  UPDATE_CONTACT_SEARCH_QUERY,
  SET_SELECTED_CONTACTS,
  // action creators
  updateContactsSearchQuery,
  setSelectedContacts
}
