const get = require('lodash/get')
const actions = require('@nudj/framework/actions')

const accept = () => async (dispatch, getState) => {
  const state = getState()
  const slug = get(state, 'app.accessRequest.slug')

  await dispatch(actions.app.postData({
    url: `/access-request/${slug}`,
    method: 'post',
    data: {}
  }))
}

module.exports = {
  accept
}
