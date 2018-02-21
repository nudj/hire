const { merge } = require('@nudj/library')
const { createReducer } = require('../../lib')
const {
  UPDATE_CONTACT_SEARCH_QUERY,
  SET_SELECTED_CONTACTS,
  SHOW_ADD_CONTACT_FORM,
  HIDE_ADD_CONTACT_FORM,
  CLEAR_ADD_CONTACT_FORM,
  SET_NEW_ITEM_VALUE,
  START_LOADING,
  STOP_LOADING
} = require('./actions')

const updateContactSearchQuery = (state, action) => ({
  ...state,
  searchQuery: action.query
})

const setSelectedContacts = (state, action) => ({
  ...state,
  selectedContacts: action.contacts
})

const showAddContactForm = state => ({
  ...state,
  showAddIndividualConnectionModal: true
})

const hideAddContactForm = state => ({
  ...state,
  showAddIndividualConnectionModal: false
})

const clearAddContactForm = state => ({
  ...state,
  newContact: {}
})

const startLoading = state => ({
  ...state,
  loading: true
})

const stopLoading = state => ({
  ...state,
  loading: false
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
  [SHOW_ADD_CONTACT_FORM]: showAddContactForm,
  [HIDE_ADD_CONTACT_FORM]: hideAddContactForm,
  [CLEAR_ADD_CONTACT_FORM]: clearAddContactForm,
  [START_LOADING]: startLoading,
  [STOP_LOADING]: stopLoading
}

const initialState = {
  selectedContacts: [],
  newContact: {},
  searchQuery: null,
  loading: false,
  showAddIndividualConnectionModal: false
}

module.exports = createReducer(initialState, reducers)
