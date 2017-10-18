const get = require('lodash/get')
const isNil = require('lodash/isNil')
const { merge } = require('@nudj/library')
const actions = require('@nudj/framework/actions')

const { getActiveStep } = require('../../lib')

const quickDispatch = (action) => (dispatch, getState) => dispatch(action)

const CONFIRM_STEP = 'CONFIRM_STEP'
module.exports.CONFIRM_STEP = CONFIRM_STEP
function confirmStep () {
  return {
    type: CONFIRM_STEP
  }
}
module.exports.confirmStep = () => quickDispatch(confirmStep())

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

const SET_ACTIVE_STEP = 'SET_ACTIVE_STEP'
module.exports.SET_ACTIVE_STEP = SET_ACTIVE_STEP
function setActiveStep (active, confirm, resets) {
  return {
    type: SET_ACTIVE_STEP,
    active,
    confirm,
    resets
  }
}
module.exports.setActiveStep = (requestedStep, currentMessage, force) => {
  return (dispatch, getState) => {
    const state = getState()
    let active = get(state, 'externalComposePage.active')
    if (isNil(active)) {
      active = getActiveStep(get(state, 'app.externalMessage', {}))
    }
    let index = requestedStep
    let resets = {}
    const step = steps[index]
    if (active < 4) { // only allow skipping through steps before sending
      let confirm = null
      if (force) { // skip the confirm dialog
        active = index
        resets[step.resets] = null // reset steps which depend on this step
      } else {
        if (index < active) { // only allow visited steps to be jumped to
          if (step.resets && !!currentMessage[step.resets]) {
            confirm = index // show confirm if step has dependents
          } else {
            active = index
          }
        } else if (
          // future steps that have been completed
          (index > active && !!currentMessage[step.name]) ||
          // TODO: not sure what this is checking for...
          (steps[index - 1] && !!currentMessage[steps[index - 1].name])
        ) {
          active = index
        }
      }
      dispatch(setActiveStep(active, confirm, resets))
    }
  }
}

const SET_STEP_DATA = 'SET_STEP_DATA'
module.exports.SET_STEP_DATA = SET_STEP_DATA
function setStepData (stepName, stepData) {
  return {
    type: SET_STEP_DATA,
    stepName,
    stepData
  }
}
module.exports.setStepData = (stepName, stepData) => quickDispatch(setStepData(stepName, stepData))

const SAVE_MESSAGE_DRAFT = 'SAVE_MESSAGE_DRAFT'
module.exports.SAVE_MESSAGE_DRAFT = SAVE_MESSAGE_DRAFT
function saveMessageDraft (body) {
  return {
    type: SAVE_MESSAGE_DRAFT,
    body
  }
}
module.exports.saveMessageDraft = (body) => quickDispatch(saveMessageDraft(body))

const SAVE_STEP_DATA = 'SAVE_STEP_DATA'
module.exports.SAVE_STEP_DATA = SAVE_STEP_DATA
function saveStepData (stepName, stepData) {
  return {
    type: SAVE_STEP_DATA,
    stepName,
    stepData
  }
}
module.exports.saveStepData = (stepName, stepData) => {
  return (dispatch, getState) => {
    const state = getState()
    const messageId = get(state, 'app.externalMessage.id')
    const url = `/jobs/${get(state, 'app.job.slug')}/external/${messageId}`
    const method = 'patch'
    const {
      selectLength,
      selectStyle,
      composeMessage,
      sendMessage
    } = state.externalComposePage

    dispatch(actions.app.postData({
      url,
      method,
      data: merge({
        selectLength,
        selectStyle,
        composeMessage,
        sendMessage
      }, {[stepName]: stepData})
    }))
    dispatch(saveStepData(stepName, stepData))
  }
}
module.exports.saveSendData = (stepName, stepData, options) => {
  if (stepData !== 'GMAIL' && options.url) {
    window.open(options.url)
  }
  return module.exports.saveStepData(stepName, stepData)
}

const HIDE_CONFIRM = 'HIDE_CONFIRM'
module.exports.HIDE_CONFIRM = HIDE_CONFIRM
function hideConfirm () {
  return {
    type: HIDE_CONFIRM
  }
}
module.exports.hideConfirm = () => quickDispatch(hideConfirm())
