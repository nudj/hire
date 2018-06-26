const actions = require('@nudj/framework/actions')

const RESET_FORM = 'ADD_JOBS_RESET_FORM'
const SET_FIELD_VALUE = 'ADD_JOBS_SET_FIELD_VALUE'
const SUBMIT_JOB = 'ADD_JOBS_SUBMIT_JOB'

const setFieldValue = (key, value) => ({
  type: SET_FIELD_VALUE,
  key,
  value
})

const resetForm = () => ({
  type: RESET_FORM
})

const submitJob = () => async (dispatch, getState) => {
  const state = getState()
  const { fieldValues: data } = state.addJobPage

  dispatch(resetForm())

  await dispatch(
    actions.app.postData({
      url: '/jobs/new',
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
  // constants
  RESET_FORM,
  SUBMIT_JOB,
  SET_FIELD_VALUE
}
