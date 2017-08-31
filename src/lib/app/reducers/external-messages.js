let {
  SET_ACTIVE_STEP,
  SET_STEP_DATA,
  SAVE_STEP_DATA,
  HIDE_CONFIRM
} = require('../actions/app')
const { merge } = require('@nudj/library')

const initialState = {
  active: 0
}

const steps = [
  {
    name: 'selectLength',
    resets: 'composeMessage'
  },
  {
    name: 'selectStyle',
    resets: 'composeMessage'
  },
  {
    name: 'composeMessage',
  },
  {
    name: 'sendMessage',
    confirm: 'GMAIL'
  },
  {
    name: 'nextSteps'
  }
]

function externalMessagesReducer (state = initialState, action) {
  switch (action.type) {
    case SET_ACTIVE_STEP:
      const force = action.force
      let active = state.active
      let index = action.stepNumber
      let resets = {}
      const step = steps[index]
      if (active < 4) { // only allow skipping through steps before sending
        let confirm = null
        if (force) { // skip the confirm dialog
          active = index
          resets[step.resets] = null // reset steps which depend on this step
        } else {
          if (index < active) { // only allow visited steps to be jumped to
            if (step.resets && !!state[step.resets]) {
              confirm = index // show confirm if step has dependents
            } else {
              active = index
            }
          } else if (
            // future steps that have been completed
            (index > state.active && !!state[step.name]) ||
            // TODO: not sure what this is checking for...
            (steps[index - 1] && !!state[steps[index - 1].name])
          ) {
            active = index
          }
        }
        return merge(state, {
          active,
          confirm,
        }, resets)
      }
      return state
    case SET_STEP_DATA:
      return merge(state, {
        [action.stepName]: action.stepData
      })
    case SAVE_STEP_DATA:
      return merge(state, {
        active: state.active + 1,
        [action.stepName]: action.stepData
      })
    case HIDE_CONFIRM:
      return merge(state, {
        confirm: null
      })
    default:
      return state
  }
}

module.exports = {
  externalMessagesReducer
}
