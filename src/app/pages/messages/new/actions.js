const SELECT_JOB = 'SELECT_JOB'
const UPDATE_SUBJECT = 'UPDATE_SUBJECT'
const UPDATE_MESSAGE = 'UPDATE_MESSAGE'
const SEND_MESSAGE = 'SEND_MESSAGE'

const selectJob = id => ({
  type: SELECT_JOB,
  id
})

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
  SELECT_JOB,
  UPDATE_SUBJECT,
  UPDATE_MESSAGE,
  SEND_MESSAGE,
  // action creators
  selectJob,
  updateSubject,
  updateMessage,
  sendMessage
}
