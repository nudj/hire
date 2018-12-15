const actions = require('@nudj/framework/actions')
const { jobStatuses } = require('../../lib/constants')

const RESET_FORM = 'SET_BONUS_RESET_FORM'
const SET_FIELD_VALUE = 'SET_BONUS_SET_FIELD_VALUE'
const SET_FIELD_VALUES = 'SET_BONUS_SET_FIELD_VALUES'
const SUBMIT_JOB = 'SET_BONUS_SUBMIT_JOB'

const setFieldValue = (key, value) => ({
  type: SET_FIELD_VALUE,
  key,
  value
})

const setFieldValues = (values) => ({
  type: SET_FIELD_VALUES,
  values
})

const resetForm = () => ({
  type: RESET_FORM
})

const submitBonusAndPublishJob = bonus => async (dispatch, getState) => {
  const state = getState()
  const { id, slug } = state.app.user.hirer.company.job

  dispatch(resetForm())

  await dispatch(
    actions.app.postData({
      url: `/jobs/${slug}/bonus`,
      method: 'post',
      data: {
        id,
        bonus,
        status: jobStatuses.PUBLISHED
      }
    })
  )
}

module.exports = {
  // action creators
  setFieldValue,
  setFieldValues,
  submitBonusAndPublishJob,
  resetForm,
  // constants
  RESET_FORM,
  SUBMIT_JOB,
  SET_FIELD_VALUE,
  SET_FIELD_VALUES
}
