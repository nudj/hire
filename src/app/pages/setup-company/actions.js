const actions = require('@nudj/framework/actions')

const INIT_FIELD_VALUES = 'SETUP_COMPANY_INIT_FIELD_VALUES'
const SET_FIELD_VALUE = 'SETUP_COMPANY_SET_FIELD_VALUE'
const SUBMIT_FORM = 'SETUP_COMPANY_SUBMIT_FORM'
const RESET_FORM = 'SETUP_COMPANY_RESET_FORM'

const initFieldValues = (values) => ({
  type: INIT_FIELD_VALUES,
  fieldValues: values
})

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
  INIT_FIELD_VALUES,
  SET_FIELD_VALUE,
  SUBMIT_FORM,
  RESET_FORM,
  // action creators
  initFieldValues,
  setFieldValue,
  submitCompany
}
