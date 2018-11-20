const actions = require('@nudj/framework/actions')
const { convertErrorToErroredFields } = require('./helpers')

const RESET_FORM = 'INTEGRATION_RESET_FORM'
const REMOVE_ERRORS = 'INTEGRATION_REMOVE_ERRORS'
const SET_FIELD_VALUE = 'INTEGRATION_SET_FIELD_VALUE'
const SET_ERRORED_FIELDS = 'INTEGRATION_SET_ERRORED_FIELDS'
const SUBMIT_JOB = 'INTEGRATION_SUBMIT_JOB'
const INITIALISE_VALUES = 'INTEGRATION_INITIALISE_VALUES'
const START_VERIFYING = 'INTEGRATION_START_VERIFYING'
const STOP_VERIFYING = 'INTEGRATION_STOP_VERIFYING'
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

const startVerifying = () => ({
  type: START_VERIFYING
})

const stopVerifying = () => ({
  type: STOP_VERIFYING
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

function verifyIntegration (integrationType) {
  return async (dispatch, getState) => {
    dispatch(startVerifying())

    const { app: result } = await dispatch(
      actions.app.postData({
        url: `/integrations/${integrationType}/verify`,
        method: 'post',
        showLoadingState: false,
        jsonOnly: true
      })
    )

    if (result.error) {
      const erroredFields = convertErrorToErroredFields(result.error)
      dispatch(setErroredFields(erroredFields))
    } else {
      dispatch(actions.app.showNotification({
        type: 'success',
        message: 'Integration credentials are correct'
      }))
    }

    dispatch(stopVerifying())
  }
}

function syncIntegration (integrationType) {
  return async (dispatch, getState) => {
    dispatch(startSyncing())

    const { app: result } = await dispatch(
      actions.app.postData({
        url: `/integrations/${integrationType}/sync`,
        method: 'post',
        showLoadingState: false,
        jsonOnly: true
      })
    )

    dispatch(actions.app.showNotification({
      type: result.error ? 'error' : 'success',
      message: result.error ? 'Syncing has failed. Please verify your credentials' : 'Integration synced!'
    }))

    dispatch(stopSyncing())
  }
}

module.exports = {
  // action creators
  setFieldValue,
  submit,
  resetForm,
  initialiseValues,
  verifyIntegration,
  syncIntegration,
  setErroredFields,
  removeErrors,
  startVerifying,
  stopVerifying,
  startSyncing,
  stopSyncing,
  showModal,
  hideModal,
  // constants
  START_VERIFYING,
  STOP_VERIFYING,
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
