let {
  SET_ACTIVE_STEP,
  EXTERNAL_MESSAGE_CONFIRM
} = require('../actions/app')
const { merge } = require('@nudj/library')

const initialState = {
  active: 0
}

function externalMessagesReducer (state = initialState, action) {
  switch (action.type) {
    case SET_ACTIVE_STEP:
      return merge(state, { active: action.stepNumber })
    case EXTERNAL_MESSAGE_CONFIRM:
      return merge(state, {
        active: state.active + 1
      })
    default:
      return state
  }
}

module.exports = {
  externalMessagesReducer
}
