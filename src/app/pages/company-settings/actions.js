const actions = require('@nudj/framework/actions')

const SET_FIELD_VALUE = 'COMPANY_SETTINGS_SET_FIELD_VALUE'
const INITIALISE_VALUES = 'COMPANY_SETTINGS_INITIALISE_VALUES'
const RESET_FORM = 'COMPANY_SETTINGS_RESET_FORM'

const setFieldValue = (key, value) => ({
  type: SET_FIELD_VALUE,
  key,
  value
})

const initialiseValues = values => ({
  type: INITIALISE_VALUES,
  values
})

const resetForm = () => ({
  type: RESET_FORM
})

const submitCompanyDetails = () => async (dispatch, getState) => {
  const state = getState()
  const { fieldValues } = state.companySettingsPage
  const companyId = state.app.user.hirer.company.id

  dispatch(resetForm())

  await dispatch(
    actions.app.postData({
      url: '/company-settings',
      method: 'post',
      data: {
        ...fieldValues,
        companyId
      }
    })
  )
}

module.exports = {
  // constants
  SET_FIELD_VALUE,
  INITIALISE_VALUES,
  RESET_FORM,
  // action creators
  setFieldValue,
  resetForm,
  initialiseValues,
  submitCompanyDetails
}
