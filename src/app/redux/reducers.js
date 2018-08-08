const surveyQuestionPage = require('../pages/survey-question/reducer')
const uploadLinkedinConnectionsPage = require('../pages/setup-linkedin/reducer')
const composeMessage = require('../pages/messages/new/reducer')
const contactsPage = require('../pages/contacts/reducer')
const invitePage = require('../pages/invite/reducer')
const setupCompanyPage = require('../pages/setup-company/reducer')
const addBonusPage = require('../pages/add-jobs/set-bonus/reducer')
const addJobPage = require('../pages/add-jobs/reducer')
const editJobPage = require('../pages/edit-jobs/reducer')
const selections = require('./reducers/selections')

module.exports = {
  surveyQuestionPage,
  uploadLinkedinConnectionsPage,
  contactsPage,
  invitePage,
  setupCompanyPage,
  addBonusPage,
  addJobPage,
  editJobPage,
  composeMessage,
  /** global */
  selections
}
