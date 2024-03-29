const surveyQuestionPage = require('../pages/survey-question/reducer')
const uploadLinkedinConnectionsPage = require('../pages/setup-linkedin/reducer')
const pickJob = require('../pages/messages-pick-job/reducer')
const composeMessage = require('../pages/messages-compose/reducer')
const contactsPage = require('../pages/contacts/reducer')
const invitePage = require('../pages/invite/reducer')
const setupCompanyPage = require('../pages/setup-company/reducer')
const companySettingsPage = require('../pages/company-settings/reducer')
const addBonusPage = require('../pages/add-job-bonus/reducer')
const addJobPage = require('../pages/add-job/reducer')
const editJobPage = require('../pages/edit-jobs/reducer')
const editIntroPage = require('../pages/edit-intro/reducer')
const editSurveyPage = require('../pages/edit-survey/reducer')
const editSurveyQuestionPage = require('../pages/edit-survey/reducer')
const hirerPage = require('../pages/hirer/reducer')
const hirerEditPage = require('../pages/hirer-edit/reducer')
const companyIntegrationPage = require('../pages/company-integration/reducer')
const manageSurveyQuestionsPage = require('../pages/manage-survey-questions/reducer')
const selections = require('./reducers/selections')
const dropdowns = require('./reducers/dropdowns')

module.exports = {
  manageSurveyQuestionsPage,
  surveyQuestionPage,
  uploadLinkedinConnectionsPage,
  contactsPage,
  invitePage,
  setupCompanyPage,
  companySettingsPage,
  addBonusPage,
  addJobPage,
  editJobPage,
  editIntroPage,
  editSurveyPage,
  hirerPage,
  hirerEditPage,
  pickJob,
  composeMessage,
  companyIntegrationPage,
  editSurveyQuestionPage,
  /** global **/
  selections,
  dropdowns
}
