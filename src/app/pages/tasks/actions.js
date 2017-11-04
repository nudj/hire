const PREFIX = 'TASKS_PAGE'

const quickDispatch = (action) => (dispatch, getState) => dispatch(action)

const TOGGLE_COMPLETED = `${PREFIX}_TOGGLE_COMPLETED`
module.exports.TOGGLE_COMPLETED = TOGGLE_COMPLETED
function toggleCompleted () {
  return {
    type: TOGGLE_COMPLETED
  }
}
module.exports.toggleCompleted = () => quickDispatch(toggleCompleted())
