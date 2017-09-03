const camelCase = require('lodash/camelCase')
const isNil = require('lodash/isNil')
const { merge } = require('@nudj/library')

const initialState = {}
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
    name: 'composeMessage'
  },
  {
    name: 'sendMessage',
    confirm: 'GMAIL'
  },
  {
    name: 'nextSteps'
  }
]

const setActiveStep = (state, action) => {
  const force = action.force
  let active = isNil(state.active) ? 0 : state.active
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
      confirm
    }, resets)
  }
  return state
}

const setStepData = (state, action) => {
  return merge(state, {
    [action.stepName]: action.stepData
  })
}

const saveStepData = (state, action) => {
  let active = isNil(state.active) ? 0 : state.active
  return merge(state, {
    active: active + 1,
    [action.stepName]: action.stepData
  })
}

const hideConfirm = (state, action) => {
  return merge(state, {
    confirm: null
  })
}

const actions = {
  setActiveStep,
  setStepData,
  saveStepData,
  hideConfirm
}

const externalMessagesReducer = (state = initialState, action) => {
  const type = camelCase(action.type)
  return actions[type] ? actions[type](state, action) : state
}

module.exports = {
  externalMessagesReducer
}
