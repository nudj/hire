const actions = require('@nudj/framework/actions')
const get = require('lodash/get')

const RESET_FORM = 'EDIT_SURVEY_RESET_FORM'
const SET_FIELD_VALUE = 'EDIT_SURVEY_SET_FIELD_VALUE'
const SUBMIT_SURVEY = 'EDIT_SURVEY_SUBMIT_SURVEY'

const setFieldValue = (key, value) => ({
  type: SET_FIELD_VALUE,
  key,
  value
})

const resetForm = () => ({
  type: RESET_FORM
})

const submitSurvey = () => async (dispatch, getState) => {
  const state = getState()
  const existingSurvey = get(state, 'app.user.hirer.company.survey')
  const { fieldValues: data } = state.editSurveyPage

  dispatch(resetForm())

  let url = '/manage/surveys/new'
  let method = 'post'
  if (existingSurvey) {
    method = 'patch'
    url = `/manage/surveys/${existingSurvey.slug}/edit`
  }

  await dispatch(
    actions.app.postData({ url, method, data })
  )
}

module.exports = {
  // action creators
  setFieldValue,
  submitSurvey,
  resetForm,
  // constants
  RESET_FORM,
  SUBMIT_SURVEY,
  SET_FIELD_VALUE
}
