const surveyQuestionPage = require('../pages/survey-question/reducer')
const uploadLinkedinConnectionsPage = require('../pages/setup-linkedin/reducer')
const composeMessage = require('../pages/messages/new/reducer')
const contactsPage = require('../pages/contacts/reducer')
const invitePage = require('../pages/invite/reducer')
const inviteTeamPage = require('../pages/invite-team/reducer')
const setupCompanyPage = require('../pages/setup-company/reducer')
const setupJobsPage = require('../pages/setup-jobs/reducer')
const setBonusPage = require('../pages/setup-jobs/set-bonus/reducer')
const addBonusPage = require('../pages/add-jobs/set-bonus/reducer')
const addJobsPage = require('../pages/add-jobs/reducer')

module.exports = {
  surveyQuestionPage,
  uploadLinkedinConnectionsPage,
  contactsPage,
  invitePage,
  inviteTeamPage,
  setupCompanyPage,
  setupJobsPage,
  setBonusPage,
  addBonusPage,
  addJobsPage,
  composeMessage
}
