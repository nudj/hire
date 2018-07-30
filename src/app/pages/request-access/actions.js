const get = require('lodash/get')
const actions = require('@nudj/framework/actions')

const requestAccess = () => async (dispatch, getState) => {
  const state = getState()
  const slug = get(state, 'app.company.slug')

  await dispatch(actions.app.postData({
    url: `/request-access/${slug}`,
    method: 'post',
    data: {}
  }))
}

module.exports = {
  requestAccess
}
