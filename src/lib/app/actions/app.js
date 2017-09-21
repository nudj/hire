const { push } = require('@nudj/react-router-redux')
const request = require('../../lib/request')
const { merge } = require('@nudj/library')
const get = require('lodash/get')
const isNil = require('lodash/isNil')

const quickDispatch = (action) => (dispatch, getState) => dispatch(action)

const FETCHED_PAGE = 'FETCHED_PAGE'
module.exports.FETCHED_PAGE = FETCHED_PAGE
function fetchedPage (data) {
  return {
    type: FETCHED_PAGE,
    data
  }
}
module.exports.setPage = (data) => quickDispatch(fetchedPage(data))

const SHOW_ERROR = 'SHOW_ERROR'
module.exports.SHOW_ERROR = SHOW_ERROR
function showError () {
  return {
    type: SHOW_ERROR
  }
}
module.exports.showError = () => quickDispatch(showError())

const SHOW_LOADING = 'SHOW_LOADING'
module.exports.SHOW_LOADING = SHOW_LOADING
function showLoading () {
  return {
    type: SHOW_LOADING
  }
}
module.exports.showLoading = () => quickDispatch(showLoading())

const SHOW_DIALOG = 'SHOW_DIALOG'
module.exports.SHOW_DIALOG = SHOW_DIALOG
function showDialog (actions) {
  return {
    type: SHOW_DIALOG,
    actions
  }
}
module.exports.showDialog = () => quickDispatch(showDialog())

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
const getActiveStep = (externalMessage) => {
  let active = 0
  if (externalMessage.sendMessage) {
    active = 4
  } else if (externalMessage.composeMessage) {
    active = 3
  } else if (externalMessage.selectStyle) {
    active = 2
  } else if (externalMessage.selectLength) {
    active = 1
  }
  return active
}
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
    let active = get(state, 'externalMessagePage.active')
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

const HIDE_CONFIRM = 'HIDE_CONFIRM'
module.exports.HIDE_CONFIRM = HIDE_CONFIRM
function hideConfirm () {
  return {
    type: HIDE_CONFIRM
  }
}
module.exports.hideConfirm = () => quickDispatch(hideConfirm())

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
    let url = `/jobs/${get(state, 'app.job.slug')}/external/${get(state, 'app.recipient.id')}`
    let method = 'post'
    const {
      selectLength,
      selectStyle,
      composeMessage,
      sendMessage
    } = state.externalMessagePage

    if (messageId) {
      url = `${url}/${messageId}`
      method = 'patch'
    }
    dispatch(module.exports.postData({
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

const EXTERNAL_MESSAGE_CONFIRM = 'EXTERNAL_MESSAGE_CONFIRM'
module.exports.EXTERNAL_MESSAGE_CONFIRM = EXTERNAL_MESSAGE_CONFIRM
function externalMessageConfirm () {
  return {
    type: EXTERNAL_MESSAGE_CONFIRM
  }
}
module.exports.externalMessageConfirm = () => quickDispatch(externalMessageConfirm())

const HIDE_DIALOG = 'HIDE_DIALOG'
module.exports.HIDE_DIALOG = HIDE_DIALOG
function hideDialog () {
  return {
    type: HIDE_DIALOG
  }
}
module.exports.hideDialog = () => quickDispatch(hideDialog())

const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION'
module.exports.SHOW_NOTIFICATION = SHOW_NOTIFICATION
function showNotification (notification) {
  return {
    type: SHOW_NOTIFICATION,
    notification
  }
}
module.exports.showNotification = () => quickDispatch(showNotification())

const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION'
module.exports.HIDE_NOTIFICATION = HIDE_NOTIFICATION
function hideNotification () {
  return {
    type: HIDE_NOTIFICATION
  }
}
module.exports.hideNotification = () => quickDispatch(hideNotification())

module.exports.postData = ({
  url,
  method = 'post',
  data
}) => {
  return (dispatch, getState) => {
    const state = getState()
    dispatch(showLoading())
    request(url, {
      method,
      data: merge(data, {
        _csrf: state.app.csrfToken
      })
    })
    .then((data) => {
      dispatch(fetchedPage(data))
      if (data.app.url.originalUrl !== url) {
        dispatch(push(data.app.url.originalUrl))
      }
    })
    .catch((error) => {
      console.error(error)
      if (error.message === 'Unauthorized') {
        // refresh the page to trigger a login redirection
        window.location = ''
        return
      }
      if (error.message === 'Unauthorized Google') {
        window.location = '/auth/google'
        return
      }
      dispatch(showError())
    })
  }
}

module.exports.postFile = ({
  url,
  method = 'post',
  file,
  data
}) => {
  const formData = new window.FormData()
  formData.append('file', file)
  Object.keys(data).forEach(key => {
    formData.append(key, data[key])
  })

  return (dispatch, getState) => {
    const state = getState()
    formData.append('_csrf', state.app.csrfToken)

    dispatch(showLoading())
    request(url, {
      method,
      data: formData
    })
    .then((data) => {
      dispatch(fetchedPage(data))
      if (data.app.url.originalUrl !== url) {
        dispatch(push(data.app.url.originalUrl))
      }
    })
  }
}
