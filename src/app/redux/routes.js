module.exports = {
  '/': require('../pages/task-list'),
  // '/import-contacts': require('../pages/import-contacts-linkedin'),
  // '/survey-page': require('../pages/survey'),
  // '/hirer-survey': require('../pages/hirer-survey'),
  '/jobs': require('../pages/jobs'),
  '/jobs/:jobSlug': require('../pages/job'),
  '/jobs/:jobSlug/nudj': require('../pages/nudj'),
  '/jobs/:jobSlug/internal': require('../pages/internal-compose'),
  '/jobs/:jobSlug/internal/:messageId': require('../pages/internal-compose'),
  '/jobs/:jobSlug/external': require('../pages/external-select'),
  '/jobs/:jobSlug/external/:messageId': require('../pages/external-compose')
}
