const { push } = require('@nudj/react-router-redux')
const request = require('../../lib/request')
const { merge } = require('@nudj/library')

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

const SENDING = 'SENDING'
module.exports.SENDING = SENDING
function sending () {
  return {
    type: SENDING
  }
}
module.exports.sending = () => {
  return (dispatch, getState) => {
    dispatch(sending())
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
function showDialog (overlay) {
  return {
    type: SHOW_DIALOG,
    overlay
  }
}
module.exports.showDialog = (overlay) => {
  return (dispatch, getState) => {
    dispatch(showDialog(overlay))
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
function setActiveStep (stepNumber) {
  return {
    type: SET_ACTIVE_STEP,
    stepNumber
  }
}
module.exports.setActiveStep = (stepNumber) => {
  return (dispatch, getState) => {
    dispatch(setActiveStep(stepNumber))
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

module.exports.postData = ({
  url,
  method = 'post',
  data
}) => {
  return (dispatch, getState) => {
    let state = getState()
    dispatch(sending())
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

    dispatch(sending())
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
