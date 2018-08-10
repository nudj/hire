const axios = require('axios')
const get = require('lodash/get')
const actions = require('@nudj/framework/actions')
const { logger } = require('@nudj/library')

const UPDATE_SEARCH_QUERY = 'DISCOVER_UPDATE_SEARCH_QUERY'
const UPDATE_FAVOURITES_FILTER = 'DISCOVER_UPDATE_FAVOURITES_FILTER'
const UPDATE_EXPERTISE_TAG_FILTER = 'DISCOVER_UPDATE_EXPERTISE_TAG_FILTER'
const SET_NEW_ITEM_VALUE = 'DISCOVER_SET_NEW_ITEM_VALUE'
const CLEAR_ADD_CONTACT_FORM = 'DISCOVER_CLEAR_ADD_CONTACT_FORM'
const START_SEARCH = 'DISCOVER_START_SEARCH'
const START_SEARCH_AND_CLEAR_FILTERS = 'DISCOVER_START_SEARCH_AND_CLEAR_FILTERS'
const COMPLETE_SEARCH = 'DISCOVER_COMPLETE_SEARCH'

const updateSearchQuery = (query) => ({
  type: UPDATE_SEARCH_QUERY,
  query
})

const updateFavouritesFilter = (filter) => ({
  type: UPDATE_FAVOURITES_FILTER,
  filter
})

const updateExpertiseTagFilter = (tags) => ({
  type: UPDATE_EXPERTISE_TAG_FILTER,
  tags
})

const clearAddContactForm = () => ({
  type: CLEAR_ADD_CONTACT_FORM
})

const startSearch = () => ({
  type: START_SEARCH
})

const startSearchAndClearTagFilters = () => ({
  type: START_SEARCH_AND_CLEAR_FILTERS
})

const completeSearch = () => ({
  type: COMPLETE_SEARCH
})

const setNewItemValue = (name, key, value) => ({
  type: SET_NEW_ITEM_VALUE,
  name,
  key,
  value
})

const submitNewConnection = () => (dispatch, getState) => {
  const state = getState()
  const data = get(state, 'discoverPage.newContact')
  const csrfToken = get(state, 'app.csrfToken')

  return axios({
    url: '/discover',
    method: 'post',
    headers: {
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'X-CSRF-TOKEN': csrfToken
    },
    data
  })
  .then(() => {
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

const search = (data) => actions.app.postData({
  url: '/discover',
  method: 'get',
  params: data,
  showLoadingState: false
})

const submitQuery = () => async (dispatch, getState) => {
  const state = getState()
  const { searchQuery, favouritesFilter } = state.discoverPage

  dispatch(startSearchAndClearTagFilters())

  await dispatch(search({
    search: searchQuery,
    favourites: favouritesFilter
  }))

  dispatch(completeSearch())
}

const submitSearch = () => async (dispatch, getState) => {
  const state = getState()
  const { searchQuery, favouritesFilter, expertiseTagFilter } = state.discoverPage

  dispatch(startSearch())

  await dispatch(search({
    search: searchQuery,
    favourites: favouritesFilter,
    expertiseTags: expertiseTagFilter
  }))

  dispatch(completeSearch())
}

module.exports = {
  // constants
  UPDATE_SEARCH_QUERY,
  UPDATE_FAVOURITES_FILTER,
  UPDATE_EXPERTISE_TAG_FILTER,
  SET_NEW_ITEM_VALUE,
  CLEAR_ADD_CONTACT_FORM,
  START_SEARCH,
  START_SEARCH_AND_CLEAR_FILTERS,
  COMPLETE_SEARCH,
  // action creators
  updateSearchQuery,
  updateFavouritesFilter,
  updateExpertiseTagFilter,
  clearAddContactForm,
  setNewItemValue,
  submitNewConnection,
  submitQuery,
  submitSearch
}
