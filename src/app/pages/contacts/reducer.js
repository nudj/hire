const { merge } = require('@nudj/library')
const { createReducer } = require('../../lib')
const {
  UPDATE_CONTACT_SEARCH_QUERY,
  SET_SELECTED_CONTACTS,
  SHOW_ADD_FORM,
  HIDE_ADD_FORM,
  CLEAR_ADD_FORM,
  SET_NEW_ITEM_VALUE
} = require('./actions')

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

const hideAddForm = state => ({
  ...state,
  showAddIndividualConnectionModal: false
})

const clearAddForm = state => ({
  ...state,
  newContact: {}
})

const setNewItemValue = (state, action) => {
  return merge(state, {
    [action.name]: {
      [action.key]: action.value
    }
  })
}

const reducers = {
  [SET_NEW_ITEM_VALUE]: setNewItemValue,
  [UPDATE_CONTACT_SEARCH_QUERY]: updateContactSearchQuery,
  [SET_SELECTED_CONTACTS]: setSelectedContacts,
  [SHOW_ADD_FORM]: showAddForm,
  [HIDE_ADD_FORM]: hideAddForm,
  [CLEAR_ADD_FORM]: clearAddForm
}

const initialState = {
  selectedContacts: [],
  newContact: {},
  searchQuery: null,
  showAddIndividualConnectionModal: false
}

module.exports = createReducer(initialState, reducers)
