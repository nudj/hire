module.exports = {
  '/': require('../pages/tasks'),
  '/jobs': require('../pages/jobs'),
  '/connections': require('../pages/connections'),
  '/surveys/:surveySlug': require('../pages/survey'),

  // old
  '/import-contacts': require('../pages/import-contacts'),
  '/send-survey': require('../pages/survey-compose'),
  '/jobs/:jobSlug': require('../pages/job'),
  '/jobs/:jobSlug/nudj': require('../pages/nudj'),
  '/jobs/:jobSlug/internal': require('../pages/internal-compose'),
  '/jobs/:jobSlug/internal/:messageId': require('../pages/internal-compose'),
  '/jobs/:jobSlug/external': require('../pages/external-select'),
  '/jobs/:jobSlug/external/:messageId': require('../pages/external-compose')
}
