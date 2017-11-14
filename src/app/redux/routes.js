module.exports = {
  '/': require('../pages/tasks'),
  '/jobs': require('../pages/jobs'),
  '/connections': require('../pages/connections'),
  '/connections/import': require('../pages/import'),
  '/surveys/:surveySlug': require('../pages/survey'),
  '/surveys/:surveySlug/sections/:sectionId': require('../pages/survey-section'),
  '/surveys/:surveySlug/sections/:sectionId/:questionType/:questionId': require('../pages/survey-question'),
  '/surveys/:surveySlug/complete': require('../pages/survey'),
  '/conversations': require('../pages/conversations')
}
