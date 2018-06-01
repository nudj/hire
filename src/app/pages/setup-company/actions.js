const actions = require('@nudj/framework/actions')

const SET_FIELD_VALUE = 'SETUP_COMPANY_SET_FIELD_VALUE'
const SUBMIT_FORM = 'SETUP_COMPANY_SUBMIT_FORM'
const RESET_FORM = 'SETUP_COMPANY_RESET_FORM'

const setFieldValue = (key, value) => ({
  type: SET_FIELD_VALUE,
  key,
  value
})

const resetForm = () => ({
  type: RESET_FORM
})

const submitCompany = () => async (dispatch, getState) => {
  const state = getState()
  const { fieldValues: data } = state.setupCompanyPage

  dispatch(resetForm())
  await dispatch(
    actions.app.postData({
      url: '/setup-company',
      method: 'post',
      data
    })
  )
}

module.exports = {
  // constants
  SET_FIELD_VALUE,
  SUBMIT_FORM,
  RESET_FORM,
  // action creators
  setFieldValue,
  submitCompany
}
