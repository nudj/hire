const axios = require('axios')
const get = require('lodash/get')
const actions = require('@nudj/framework/actions')
const { logger } = require('@nudj/library')

const UPDATE_CONTACT_SEARCH_QUERY = 'CONTACTS_UPDATE_CONTACT_SEARCH_QUERY'
const SHOW_ADD_CONTACT_FORM = 'CONTACTS_SHOW_ADD_CONTACT_FORM'
const HIDE_ADD_CONTACT_FORM = 'CONTACTS_HIDE_ADD_CONTACT_FORM'
const SET_NEW_ITEM_VALUE = 'CONTACTS_SET_NEW_ITEM_VALUE'
const CLEAR_ADD_CONTACT_FORM = 'CONTACTS_CLEAR_ADD_CONTACT_FORM'
const START_LOADING = 'CONTACTS_START_LOADING'
const STOP_LOADING = 'CONTACTS_STOP_LOADING'

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

const startLoading = () => ({
  type: START_LOADING
})

const stopLoading = () => ({
  type: STOP_LOADING
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
    logger('error', error)
    dispatch(actions.app.showNotification({
      type: 'error',
      message: 'Something went wrong while adding a contact! Please try again.'
    }))
  })
}

const search = (url = '/contacts') => async (dispatch, getState, ...args) => {
  const state = getState()
  const search = get(state, 'contactsPage.searchQuery') || ''

  dispatch(startLoading())
  await dispatch(
    actions.app.postData(
      {
        url,
        method: 'get',
        params: { search },
        showLoadingState: false
      }
    )
  )
  dispatch(stopLoading())
}

module.exports = {
  // constants
  UPDATE_CONTACT_SEARCH_QUERY,
  SET_SELECTED_CONTACTS,
  SET_NEW_ITEM_VALUE,
  SHOW_ADD_CONTACT_FORM,
  HIDE_ADD_CONTACT_FORM,
  CLEAR_ADD_CONTACT_FORM,
  START_LOADING,
  STOP_LOADING,
  // action creators
  updateContactsSearchQuery,
  setSelectedContacts,
  showAddContactForm,
  hideAddContactForm,
  clearAddContactForm,
  setNewItemValue,
  submitNewConnection,
  search
}
