module.exports = {
  '/': require('../pages/task-list'),
  // '/import-contacts': require('../pages/import-contacts-linkedin'),
  // '/survey-page': require('../pages/survey'),
  // '/hirer-survey': require('../pages/hirer-survey'),
  '/jobs': require('../pages/jobs'),
  '/jobs/:jobSlug': require('../pages/job'),
  '/jobs/:jobSlug/nudj': require('../pages/nudj'),
  '/jobs/:jobSlug/internal': require('../pages/compose-internal'),
  '/jobs/:jobSlug/internal/:messageId': require('../pages/compose-internal'),
  // '/jobs/:jobSlug/external': require('../pages/select-referrer-external'),
  // '/jobs/:jobSlug/external/:messageId': require('../pages/compose-external')
}
