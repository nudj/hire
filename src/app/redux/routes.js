module.exports = {
  '/': require('../pages/tasks'),
  '/jobs': require('../pages/jobs'),
  '/connections': require('../pages/connections'),
  '/connections/import': require('../pages/import'),
  '/surveys/:surveySlug': require('../pages/survey'),
  '/conversations': require('../pages/conversations')
}
