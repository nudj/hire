const actions = require('@nudj/framework/actions')

const SHOW_DELETE_MODAL = 'HIRER_SHOW_DELETE_MODAL'

const showDeleteModal = (show = true) => ({
  type: SHOW_DELETE_MODAL,
  show
})

const deleteHirer = () => async (dispatch, getState) => {
  const state = getState()
  const hirerId = state.app.user.hirer.company.hirer.id

  dispatch(showDeleteModal(false))

  await dispatch(
    actions.app.postData({
      url: `/team/${hirerId}`,
      method: 'delete'
    })
  )
}

module.exports = {
  // action creators
  showDeleteModal,
  deleteHirer,
  // constants
  SHOW_DELETE_MODAL
}
