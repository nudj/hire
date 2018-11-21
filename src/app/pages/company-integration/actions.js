const actions = require('@nudj/framework/actions')

const RESET_FORM = 'INTEGRATION_RESET_FORM'
const REMOVE_ERRORS = 'INTEGRATION_REMOVE_ERRORS'
const SET_FIELD_VALUE = 'INTEGRATION_SET_FIELD_VALUE'
const SET_ERRORED_FIELDS = 'INTEGRATION_SET_ERRORED_FIELDS'
const SUBMIT_JOB = 'INTEGRATION_SUBMIT_JOB'
const INITIALISE_VALUES = 'INTEGRATION_INITIALISE_VALUES'
const START_SYNCING = 'INTEGRATION_START_SYNCING'
const STOP_SYNCING = 'INTEGRATION_STOP_SYNCING'
const SHOW_MODAL = 'INTEGRATION_SHOW_MODAL'
const HIDE_MODAL = 'INTEGRATION_HIDE_MODAL'

const setFieldValue = (key, value) => ({
  type: SET_FIELD_VALUE,
  key,
  value
})

const setErroredFields = fields => ({
  type: SET_ERRORED_FIELDS,
  fields
})

const startSyncing = () => ({
  type: START_SYNCING
})

const stopSyncing = () => ({
  type: STOP_SYNCING
})

const resetForm = () => ({
  type: RESET_FORM
})

const removeErrors = () => ({
  type: REMOVE_ERRORS
})

const showModal = () => ({
  type: SHOW_MODAL
})

const hideModal = () => ({
  type: HIDE_MODAL
})

const initialiseValues = values => ({
  type: INITIALISE_VALUES,
  values
})

const submit = (integrationType, method) => async (dispatch, getState) => {
  const state = getState()
  const { fieldValues: data } = state.companyIntegrationPage

  await dispatch(
    actions.app.postData({
      url: `/integrations/${integrationType}`,
      method,
      data: { data }
    })
  )
}

function syncIntegration (integrationType) {
  return async (dispatch, getState) => {
    dispatch(startSyncing())

    await dispatch(
      actions.app.postData({
        url: `/integrations/${integrationType}/sync`,
        method: 'post',
        showLoadingState: false
      })
    )

    dispatch(stopSyncing())
  }
}

module.exports = {
  // action creators
  setFieldValue,
  submit,
  resetForm,
  initialiseValues,
  syncIntegration,
  setErroredFields,
  removeErrors,
  startSyncing,
  stopSyncing,
  showModal,
  hideModal,
  // constants
  START_SYNCING,
  STOP_SYNCING,
  RESET_FORM,
  REMOVE_ERRORS,
  SUBMIT_JOB,
  SET_FIELD_VALUE,
  SET_ERRORED_FIELDS,
  INITIALISE_VALUES,
  SHOW_MODAL,
  HIDE_MODAL
}
