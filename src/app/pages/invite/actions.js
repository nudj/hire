const values = require('lodash/values')
const actions = require('@nudj/framework/actions')

const SET_NESTED_FIELD_VALUE = 'INVITE_SET_NESTED_FIELD_VALUE'
const SET_VALUE = 'INVITE_SET_VALUE'
const ADD_ADDITIONAL_FIELD = 'INVITE_ADD_ADDITIONAL_FIELD'
const SUBMIT_INVITATIONS = 'INVITE_SUBMIT_INVITATIONS'
const RESET_FORM = 'INVITE_RESET_FORM'
const SHOW_LOADING = 'INVITE_SHOW_LOADING'

const setNestedFieldValue = (person, key, value) => ({
  type: SET_NESTED_FIELD_VALUE,
  person,
  key,
  value
})

const setValue = (key, value) => ({
  type: SET_VALUE,
  key,
  value
})

const showLoading = () => ({
  type: SHOW_LOADING
})

const addAdditionalField = () => ({
  type: ADD_ADDITIONAL_FIELD
})

const resetForm = () => ({
  type: RESET_FORM
})

const submitInvitations = () => async (dispatch, getState) => {
  const state = getState()
  const { fieldValues } = state.invitePage
  const members = values(fieldValues).filter(member => !!member.email)

  if (!members.length) {
    return dispatch(actions.app.showNotification({
      type: 'error',
      message: 'Please add an email address'
    }))
  }

  dispatch(resetForm())
  await dispatch(
    actions.app.postData({
      url: '/team/invite',
      method: 'post',
      data: { members }
    })
  )
}

module.exports = {
  // constants
  SET_NESTED_FIELD_VALUE,
  ADD_ADDITIONAL_FIELD,
  SUBMIT_INVITATIONS,
  RESET_FORM,
  SHOW_LOADING,
  SET_VALUE,
  // action creators
  setValue,
  setNestedFieldValue,
  showLoading,
  submitInvitations,
  addAdditionalField
}
