const { merge } = require('@nudj/library')
const { createReducer } = require('../../lib')
const {
  UPDATE_SEARCH_QUERY,
  UPDATE_FAVOURITES_FILTER,
  UPDATE_EXPERTISE_TAG_FILTER,
  CLEAR_ADD_CONTACT_FORM,
  SET_NEW_ITEM_VALUE,
  START_SEARCH_AND_CLEAR_FILTERS,
  START_SEARCH,
  COMPLETE_SEARCH
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

const clearFilters = state => ({
  ...state,
  expertiseTagFilter: []
})

const startLoadingAndClearFilters = state => {
  return startLoading(clearFilters(state))
}

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
  [START_SEARCH_AND_CLEAR_FILTERS]: startLoadingAndClearFilters,
  [START_SEARCH]: startLoading,
  [COMPLETE_SEARCH]: stopLoading,
  [CLEAR_ADD_CONTACT_FORM]: clearAddContactForm
}

const initialState = {
  selectedContacts: [],
  newContact: {},
  searchQuery: null,
  loading: false,
  showAddIndividualConnectionModal: false,
  favouritesFilter: null,
  expertiseTagFilter: null
}

module.exports = createReducer(initialState, reducers)
