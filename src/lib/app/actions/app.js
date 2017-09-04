const { push } = require('@nudj/react-router-redux')
const request = require('../../lib/request')
const { merge } = require('@nudj/library')
const get = require('lodash/get')

const FETCHED_PAGE = 'FETCHED_PAGE'
module.exports.FETCHED_PAGE = FETCHED_PAGE
function fetchedPage (data) {
  return {
    type: FETCHED_PAGE,
    data
  }
}
module.exports.setPage = (data) => {
  return (dispatch, getState) => {
    dispatch(fetchedPage(data))
  }
}

const SHOW_ERROR = 'SHOW_ERROR'
module.exports.SHOW_ERROR = SHOW_ERROR
function showError () {
  return {
    type: SHOW_ERROR
  }
}
module.exports.showError = () => {
  return (dispatch, getState) => {
    dispatch(showError())
  }
}

const SHOW_LOADING = 'SHOW_LOADING'
module.exports.SHOW_LOADING = SHOW_LOADING
function showLoading () {
  return {
    type: SHOW_LOADING
  }
}
module.exports.showLoading = () => {
  return (dispatch, getState) => {
    dispatch(showLoading())
  }
}

const SHOW_DIALOG = 'SHOW_DIALOG'
module.exports.SHOW_DIALOG = SHOW_DIALOG
function showDialog (actions) {
  return {
    type: SHOW_DIALOG,
    actions
  }
}
module.exports.showDialog = (actions) => {
  return (dispatch, getState) => {
    dispatch(showDialog(actions))
  }
}

const CONFIRM_STEP = 'CONFIRM_STEP'
module.exports.CONFIRM_STEP = CONFIRM_STEP
function confirmStep () {
  return {
    type: CONFIRM_STEP
  }
}
module.exports.confirmStep = () => {
  return (dispatch, getState) => {
    dispatch(confirmStep())
  }
}

const SET_ACTIVE_STEP = 'SET_ACTIVE_STEP'
module.exports.SET_ACTIVE_STEP = SET_ACTIVE_STEP
function setActiveStep (requestedStep, currentStep, currentMessage, force) {
  return {
    type: SET_ACTIVE_STEP,
    requestedStep,
    currentStep,
    currentMessage,
    force
  }
}
module.exports.setActiveStep = (requestedStep, currentStep, currentMessage, force) => {
  return (dispatch, getState) => {
    dispatch(setActiveStep(requestedStep, currentStep, currentMessage, force))
  }
}

const HIDE_CONFIRM = 'HIDE_CONFIRM'
module.exports.HIDE_CONFIRM = HIDE_CONFIRM
function hideConfirm () {
  return {
    type: HIDE_CONFIRM
  }
}
module.exports.hideConfirm = () => {
  return (dispatch, getState) => {
    dispatch(hideConfirm())
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
module.exports.setStepData = (stepName, stepData) => {
  return (dispatch, getState) => {
    dispatch(setStepData(stepName, stepData))
  }
}

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
    const messageId = get(state, 'page.message.id')
    let url = `/jobs/${get(state, 'page.job.slug')}/external/${get(state, 'page.recipient.id')}`
    let method = 'post'
    const {
      selectLength,
      selectStyle,
      composeMessage,
      sendMessage
    } = state.externalMessages

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
module.exports.externalMessageConfirm = () => {
  return (dispatch, getState) => {
    dispatch(externalMessageConfirm())
  }
}

const HIDE_DIALOG = 'HIDE_DIALOG'
module.exports.HIDE_DIALOG = HIDE_DIALOG
function hideDialog () {
  return {
    type: HIDE_DIALOG
  }
}
module.exports.hideDialog = () => {
  return (dispatch, getState) => {
    dispatch(hideDialog())
  }
}

const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION'
module.exports.SHOW_NOTIFICATION = SHOW_NOTIFICATION
function showNotification (notification) {
  return {
    type: SHOW_NOTIFICATION,
    notification
  }
}
module.exports.showNotification = (notification) => {
  return (dispatch, getState) => {
    dispatch(showNotification(notification))
  }
}

const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION'
module.exports.HIDE_NOTIFICATION = HIDE_NOTIFICATION
function hideNotification () {
  return {
    type: HIDE_NOTIFICATION
  }
}
module.exports.hideNotification = () => {
  return (dispatch, getState) => {
    dispatch(hideNotification())
  }
}

const INITIALISE = 'INITIALISE'
module.exports.INITIALISE = INITIALISE
function initialise (data) {
  return {
    type: INITIALISE,
    data
  }
}
module.exports.initialise = (data) => {
  return (dispatch, getState) => {
    dispatch(initialise(data))
  }
}

module.exports.postData = ({
  url,
  method = 'post',
  data
}) => {
  return (dispatch, getState) => {
    let state = getState()
    dispatch(showLoading())
    request(url, {
      method,
      data: merge(data, {
        _csrf: state.page.csrfToken
      })
    })
    .then((data) => {
      dispatch(fetchedPage(data))
      if (data.page.url.originalUrl !== url) {
        dispatch(push(data.page.url.originalUrl))
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
    formData.append('_csrf', state.page.csrfToken)

    dispatch(showLoading())
    request(url, {
      method,
      data: formData
    })
    .then((data) => {
      dispatch(fetchedPage(data))
      if (data.page.url.originalUrl !== url) {
        dispatch(push(data.page.url.originalUrl))
      }
    })
  }
}
