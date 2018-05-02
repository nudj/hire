const surveyQuestionPage = require('../pages/survey-question/reducer')
const uploadLinkedinConnectionsPage = require('../pages/setup-linkedin/reducer')
const composeMessage = require('../pages/messages/new/reducer')
const contactsPage = require('../pages/contacts/reducer')
const invitePage = require('../pages/invite/reducer')
const inviteTeamPage = require('../pages/invite-team/reducer')

module.exports = {
  surveyQuestionPage,
  uploadLinkedinConnectionsPage,
  contactsPage,
  invitePage,
  inviteTeamPage,
  composeMessage
}
