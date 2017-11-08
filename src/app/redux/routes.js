module.exports = {
  '/': require('../pages/tasks'),
  '/jobs': require('../pages/jobs'),
  '/connections': require('../pages/connections'),
  '/surveys/:surveySlug': require('../pages/survey'),
  '/conversations': require('../pages/conversations')
}
