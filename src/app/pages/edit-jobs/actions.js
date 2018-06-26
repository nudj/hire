const actions = require('@nudj/framework/actions')

const RESET_FORM = 'EDIT_JOBS_RESET_FORM'
const SET_FIELD_VALUE = 'EDIT_JOBS_SET_FIELD_VALUE'
const SUBMIT_JOB = 'EDIT_JOBS_SUBMIT_JOB'
const INITIALISE_VALUES = 'EDIT_JOBS_INITIALISE_VALUES'

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

const submitJob = () => async (dispatch, getState) => {
  const state = getState()
  const { fieldValues: data } = state.editJobPage

  dispatch(resetForm())

  await dispatch(
    actions.app.postData({
      url: `/jobs/${data.slug}/edit`,
      method: 'post',
      data
    })
  )
}

module.exports = {
  // action creators
  setFieldValue,
  submitJob,
  resetForm,
  initialiseValues,
  // constants
  RESET_FORM,
  SUBMIT_JOB,
  SET_FIELD_VALUE,
  INITIALISE_VALUES
}
