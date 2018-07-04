const values = require('lodash/values')
const actions = require('@nudj/framework/actions')

const SET_NESTED_FIELD_VALUE = 'INVITE_TEAM_SET_NESTED_FIELD_VALUE'
const ADD_ADDITIONAL_FIELD = 'INVITE_TEAM_ADD_ADDITIONAL_FIELD'
const SUBMIT_INVITATIONS = 'INVITE_TEAM_SUBMIT_INVITATIONS'
const RESET_FORM = 'INVITE_TEAM_RESET_FORM'

const setNestedFieldValue = (person, key, value) => ({
  type: SET_NESTED_FIELD_VALUE,
  person,
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

const submitInvitations = inviteTemplate => async (dispatch, getState) => {
  const state = getState()
  const { fieldValues } = state.inviteTeamPage
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
      url: '/invite-team',
      method: 'post',
      data: {
        members,
        inviteTemplate
      }
    })
  )
}

module.exports = {
  // constants
  SET_NESTED_FIELD_VALUE,
  ADD_ADDITIONAL_FIELD,
  SUBMIT_INVITATIONS,
  RESET_FORM,
  // action creators
  setNestedFieldValue,
  submitInvitations,
  skipInvitation,
  addAdditionalField
}
