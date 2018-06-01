const get = require('lodash/get')
const actions = require('@nudj/framework/actions')

const onboardCompany = () => async (dispatch, getState) => {
  const state = getState()
  const companyId = get(state, 'app.user.hirer.company.id')

  await dispatch(
    actions.app.postData({
      url: '/setup-jobs',
      method: 'post',
      data: {
        companyId
      }
    })
  )
}

module.exports = {
  // action creators
  onboardCompany
}
