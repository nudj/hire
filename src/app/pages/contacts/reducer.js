const {
  UPDATE_CONTACT_SEARCH_QUERY,
  SET_SELECTED_CONTACTS,
  SHOW_ADD_FORM
} = require('./actions')

const { createReducer } = require('../../lib')

const updateContactSearchQuery = (state, action) => ({
  ...state,
  searchQuery: action.query
})

const setSelectedContacts = (state, action) => ({
  ...state,
  selectedContacts: action.contacts
})

const showAddForm = state => ({
  ...state,
  showAddIndividualConnectionModal: true
})

const reducers = {
  [UPDATE_CONTACT_SEARCH_QUERY]: updateContactSearchQuery,
  [SET_SELECTED_CONTACTS]: setSelectedContacts,
  [SHOW_ADD_FORM]: showAddForm
}

const initialState = {
  selectedContacts: [],
  searchQuery: null,
  showAddIndividualConnectionModal: false
}

module.exports = createReducer(initialState, reducers)
