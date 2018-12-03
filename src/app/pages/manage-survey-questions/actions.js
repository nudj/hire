const get = require('lodash/get')
const actions = require('@nudj/framework/actions')

const SET_LIST_ORDER = 'MANAGE_SURVEY_QUESTIONS_SET_LIST_ORDER'

const setListOrder = reorderedList => ({
  type: SET_LIST_ORDER,
  reorderedList
})

const submitQuestionOrder = () => async (dispatch, getState) => {
  const state = getState()
  const surveySlug = get(state, 'app.user.hirer.company.survey.slug')
  const { reorderedList } = state.manageSurveyQuestionsPage
  const surveyQuestions = reorderedList.map(item => item.props.id)

  await dispatch(
    actions.app.postData({
      url: `/manage/surveys/${surveySlug}/questions`,
      method: 'patch',
      data: { surveyQuestions }
    })
  )
}

module.exports = {
  // action creators
  setListOrder,
  submitQuestionOrder,
  // constants
  SET_LIST_ORDER
}
