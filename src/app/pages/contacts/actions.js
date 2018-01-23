const axios = require('axios')
const get = require('lodash/get')

const PREFIX = 'SURVEY'
const UPDATE_CONTACT_SEARCH_QUERY = 'UPDATE_CONTACT_SEARCH_QUERY'
const SET_SELECTED_CONTACTS = 'SET_SELECTED_CONTACTS'
const SHOW_ADD_FORM = `${PREFIX}_SHOW_ADD_FORM`
const HIDE_ADD_FORM = `${PREFIX}_HIDE_ADD_FORM`
const SET_NEW_ITEM_VALUE = `${PREFIX}_SET_NEW_ITEM_VALUE`

const updateContactsSearchQuery = (query) => ({
  type: UPDATE_CONTACT_SEARCH_QUERY,
  query
})

const setSelectedContacts = (contacts) => ({
  type: SET_SELECTED_CONTACTS,
  contacts
})

const showAddForm = () => ({
  type: SHOW_ADD_FORM
})

const hideAddForm = () => ({
  type: HIDE_ADD_FORM
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
    url: ``,
    method: 'post',
    headers: {
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'X-CSRF-TOKEN': csrfToken
    },
    data
  })
  .then(response => {
    dispatch(hideAddForm())
    // dispatch(clearAddForm())
  })
}

module.exports = {
  // constants
  UPDATE_CONTACT_SEARCH_QUERY,
  SET_SELECTED_CONTACTS,
  SET_NEW_ITEM_VALUE,
  SHOW_ADD_FORM,
  HIDE_ADD_FORM,
  // action creators
  updateContactsSearchQuery,
  setSelectedContacts,
  showAddForm,
  hideAddForm,
  setNewItemValue,
  submitNewConnection
}
