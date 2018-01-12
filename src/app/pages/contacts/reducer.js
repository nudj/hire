const {
  UPDATE_CONTACT_SEARCH_QUERY,
  SET_SELECTED_CONTACTS
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

const reducers = {
  [UPDATE_CONTACT_SEARCH_QUERY]: updateContactSearchQuery,
  [SET_SELECTED_CONTACTS]: setSelectedContacts
}

const initialState = {
  selectedContacts: [],
  searchQuery: null
}

module.exports = createReducer(initialState, reducers)
