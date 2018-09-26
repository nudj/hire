const actions = require('@nudj/framework/actions')

const { clearSelections } = require('../../redux/actions/selections')

const sendEmails = (data) => async (dispatch) => {
  await dispatch(
    actions.app.postData({
      url: `/jobs/share-with-team`,
      method: 'post',
      data
    })
  )

  dispatch(clearSelections())
}

module.exports = {
  sendEmails
}
