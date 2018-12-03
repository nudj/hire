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

const submitQuestion = () => async (dispatch, getState) => {
  const state = getState()
  const surveySlug = get(state, 'app.user.hirer.company.survey.slug')
  const existingSurveyQuestion = get(state, 'app.user.hirer.company.survey.question')
  const { fieldValues: data } = state.editSurveyQuestionPage

  dispatch(resetForm())

  let url = `/manage/surveys/${surveySlug}/questions/new`
  let method = 'post'
  if (existingSurveyQuestion) {
    method = 'patch'
    url = `/manage/surveys/${surveySlug}/questions/${existingSurveyQuestion.slug}/edit`
  }

  await dispatch(
    actions.app.postData({ url, method, data })
  )
}

module.exports = {
  // action creators
  setFieldValue,
  submitQuestion,
  resetForm,
  // constants
  RESET_FORM,
  SUBMIT_SURVEY,
  SET_FIELD_VALUE
}
