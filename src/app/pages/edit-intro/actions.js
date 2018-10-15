const actions = require('@nudj/framework/actions')

const RESET_FORM = 'ADD_INTROS_RESET_FORM'
const SET_FIELD_VALUE = 'ADD_INTROS_SET_FIELD_VALUE'
const SUBMIT_INTRO = 'ADD_INTROS_SUBMIT_INTRO'

const setFieldValue = (key, value) => ({
  type: SET_FIELD_VALUE,
  key,
  value
})

const resetForm = () => ({
  type: RESET_FORM
})

const submitIntro = () => async (dispatch, getState) => {
  const state = getState()
  const { fieldValues: data } = state.editIntroPage

  dispatch(resetForm())

  await dispatch(
    actions.app.postData({
      url: '/intros/new',
      method: 'post',
      data
    })
  )
}

module.exports = {
  // action creators
  setFieldValue,
  submitIntro,
  resetForm,
  // constants
  RESET_FORM,
  SUBMIT_INTRO,
  SET_FIELD_VALUE
}
