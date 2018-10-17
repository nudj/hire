const actions = require('@nudj/framework/actions')

const RESET_FORM = 'HIRER_EDIT_RESET_FORM'
const SET_FIELD_VALUE = 'HIRER_EDIT_SET_FIELD_VALUE'

const setFieldValue = (key, value) => ({
  type: SET_FIELD_VALUE,
  key,
  value
})

const resetForm = () => ({
  type: RESET_FORM
})

const submitHirer = () => async (dispatch, getState) => {
  const state = getState()
  const { fieldValues: data } = state.hirerEditPage
  const hirerId = state.app.user.hirer.company.hirer.id

  dispatch(resetForm())

  await dispatch(
    actions.app.postData({
      url: `/team/${hirerId}/edit`,
      method: 'patch',
      data
    })
  )
}

module.exports = {
  // action creators
  setFieldValue,
  submitHirer,
  resetForm,
  // constants
  RESET_FORM,
  SET_FIELD_VALUE
}
