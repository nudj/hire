const actions = require('@nudj/framework/actions')

const RESET_FORM = 'INTEGRATION_RESET_FORM'
const SET_FIELD_VALUE = 'INTEGRATION_SET_FIELD_VALUE'
const SUBMIT_JOB = 'INTEGRATION_SUBMIT_JOB'
const INITIALISE_VALUES = 'INTEGRATION_INITIALISE_VALUES'

const setFieldValue = (key, value) => ({
  type: SET_FIELD_VALUE,
  key,
  value
})

const resetForm = () => ({
  type: RESET_FORM
})

const initialiseValues = values => ({
  type: INITIALISE_VALUES,
  values
})

const submit = (integrationType, method) => async (dispatch, getState) => {
  const state = getState()
  const { fieldValues: data } = state.companyIntegrationPage

  dispatch(resetForm())

  await dispatch(
    actions.app.postData({
      url: `/integrations/${integrationType}`,
      method,
      data: { data }
    })
  )
}

module.exports = {
  // action creators
  setFieldValue,
  submit,
  resetForm,
  initialiseValues,
  // constants
  RESET_FORM,
  SUBMIT_JOB,
  SET_FIELD_VALUE,
  INITIALISE_VALUES
}
