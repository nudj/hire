const UPDATE_SUBJECT = 'UPDATE_SUBJECT'
const UPDATE_MESSAGE = 'UPDATE_MESSAGE'
const SEND_MESSAGE = 'SEND_MESSAGE'

const updateSubject = subject => ({
  type: UPDATE_SUBJECT,
  subject
})

const updateMessage = message => ({
  type: UPDATE_MESSAGE,
  message
})

const sendMessage = () => ({
  type: SEND_MESSAGE
})

module.exports = {
  // constants
  UPDATE_SUBJECT,
  UPDATE_MESSAGE,
  SEND_MESSAGE,
  // action creators
  updateSubject,
  updateMessage,
  sendMessage
}
