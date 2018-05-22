const values = require('lodash/values')
const actions = require('@nudj/framework/actions')

const SET_FIELD_VALUE = 'INVITE_TEAM_SET_FIELD_VALUE'
const ADD_ADDITIONAL_FIELD = 'INVITE_TEAM_ADD_ADDITIONAL_FIELD'
const SUBMIT_INVITATIONS = 'INVITE_TEAM_SUBMIT_INVITATIONS'
const RESET_FORM = 'INVITE_TEAM_RESET_FORM'

const setFieldValue = (key, value) => ({
  type: SET_FIELD_VALUE,
  key,
  value
})

const addAdditionalField = () => ({
  type: ADD_ADDITIONAL_FIELD
})

const resetForm = () => ({
  type: RESET_FORM
})

const skipInvitation = () => async (dispatch) => {
  dispatch(resetForm())
  await dispatch(
    actions.app.postData({
      url: '/invite-team',
      method: 'post',
      data: {}
    })
  )
}

const submitInvitations = () => async (dispatch, getState) => {
  const state = getState()
  const { fieldValues } = state.inviteTeamPage
  const emailAddresses = values(fieldValues).filter(Boolean)

  if (!emailAddresses.length) {
    return dispatch(actions.app.showNotification({
      type: 'error',
      message: 'Please add an email address'
    }))
  }

  dispatch(resetForm())
  await dispatch(
    actions.app.postData({
      url: '/invite-team',
      method: 'post',
      data: { emailAddresses }
    })
  )
}

module.exports = {
  // constants
  SET_FIELD_VALUE,
  ADD_ADDITIONAL_FIELD,
  SUBMIT_INVITATIONS,
  RESET_FORM,
  // action creators
  setFieldValue,
  submitInvitations,
  skipInvitation,
  addAdditionalField
}
