const tasksPage = require('../pages/tasks/reducer')
const surveyQuestionPage = require('../pages/survey-question/reducer')
const uploadPage = require('../pages/setup-network/linkedin/reducer')
const composeMessage = require('../pages/messages/new/reducer')
const contactsPage = require('../pages/contacts/reducer')

module.exports = {
  tasksPage,
  surveyQuestionPage,
  uploadPage,
  contactsPage,
  composeMessage
}
