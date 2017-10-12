const { AppError } = require('@nudj/framework/errors')
const { notificationTypes } = require('./constants')

const stripDelims = (tag) => tag.slice(2, -2)

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

const createNotification = (type, message) => {
  if (!type || !notificationTypes.includes(type)) throw new AppError('Invalid notification type', type)
  if (!message || typeof message !== 'string') throw new AppError('Invalid notification message', message)
  return { type, message }
}

module.exports = {
  stripDelims,
  getActiveStep,
  createNotification
}
