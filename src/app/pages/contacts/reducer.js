const { merge } = require('@nudj/library')
const { createReducer } = require('../../lib')
const {
  UPDATE_SEARCH_QUERY,
  UPDATE_FAVOURITES_FILTER,
  UPDATE_EXPERTISE_TAG_FILTER,
  CLEAR_ADD_CONTACT_FORM,
  SET_NEW_ITEM_VALUE,
  START_LOADING,
  STOP_LOADING
} = require('./actions')

const updateSearchQuery = (state, action) => ({
  ...state,
  searchQuery: action.query
})

const updateFavouritesFilter = (state, action) => ({
  ...state,
  favouritesFilter: action.filter
})

const updateExpertiseTagFilter = (state, { tags }) => ({
  ...state,
  expertiseTagFilter: tags
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
  [UPDATE_SEARCH_QUERY]: updateSearchQuery,
  [UPDATE_FAVOURITES_FILTER]: updateFavouritesFilter,
  [UPDATE_EXPERTISE_TAG_FILTER]: updateExpertiseTagFilter,
  [CLEAR_ADD_CONTACT_FORM]: clearAddContactForm,
  [START_LOADING]: startLoading,
  [STOP_LOADING]: stopLoading
}

const initialState = {
  selectedContacts: [],
  newContact: {},
  searchQuery: null,
  loading: false,
  showAddIndividualConnectionModal: false,
  favouritesFilter: false,
  expertiseTagFilter: []
}

module.exports = createReducer(initialState, reducers)
