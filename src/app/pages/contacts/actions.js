const axios = require('axios')
const get = require('lodash/get')
const actions = require('@nudj/framework/actions')

const UPDATE_CONTACT_SEARCH_QUERY = 'CONTACTS_UPDATE_CONTACT_SEARCH_QUERY'
const SET_SELECTED_CONTACTS = 'CONTACTS_SET_SELECTED_CONTACTS'
const SHOW_ADD_CONTACT_FORM = 'CONTACTS_SHOW_ADD_CONTACT_FORM'
const HIDE_ADD_CONTACT_FORM = 'CONTACTS_HIDE_ADD_CONTACT_FORM'
const SET_NEW_ITEM_VALUE = 'CONTACTS_SET_NEW_ITEM_VALUE'
const CLEAR_ADD_CONTACT_FORM = 'CONTACTS_CLEAR_ADD_CONTACT_FORM'

const updateContactsSearchQuery = (query) => ({
  type: UPDATE_CONTACT_SEARCH_QUERY,
  query
})

const setSelectedContacts = (contacts) => ({
  type: SET_SELECTED_CONTACTS,
  contacts
})

const showAddContactForm = () => ({
  type: SHOW_ADD_CONTACT_FORM
})

const hideAddContactForm = () => ({
  type: HIDE_ADD_CONTACT_FORM
})

const clearAddContactForm = () => ({
  type: CLEAR_ADD_CONTACT_FORM
})

const setNewItemValue = (name, key, value) => ({
  type: SET_NEW_ITEM_VALUE,
  name,
  key,
  value
})

const submitNewConnection = () => (dispatch, getState) => {
  const state = getState()
  const data = get(state, 'contactsPage.newContact')
  const csrfToken = get(state, 'app.csrfToken')

  return axios({
    url: '/contacts',
    method: 'post',
    headers: {
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'X-CSRF-TOKEN': csrfToken
    },
    data
  })
  .then(() => {
    dispatch(hideAddContactForm())
    dispatch(clearAddContactForm())
    dispatch(actions.app.showNotification({
      type: 'success',
      message: 'New contact added! 🎉'
    }))
  })
  .catch(error => {
    console.error(error)
    dispatch(actions.app.showNotification({
      type: 'error',
      message: 'Something went wrong while adding a contact! Please try again.'
    }))
  })
}

module.exports = {
  // constants
  UPDATE_CONTACT_SEARCH_QUERY,
  SET_SELECTED_CONTACTS,
  SET_NEW_ITEM_VALUE,
  SHOW_ADD_CONTACT_FORM,
  HIDE_ADD_CONTACT_FORM,
  CLEAR_ADD_CONTACT_FORM,
  // action creators
  updateContactsSearchQuery,
  setSelectedContacts,
  showAddContactForm,
  hideAddContactForm,
  clearAddContactForm,
  setNewItemValue,
  submitNewConnection
}
