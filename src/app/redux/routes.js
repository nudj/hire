module.exports = {
  '/welcome': require('../pages/welcome'),
  '/setup-network': require('../pages/setup-network'),
  '/setup-network/:network': require('../pages/setup-network/linkedin/request-guide'),
  '/setup-network/:network/download-data': require('../pages/setup-network/linkedin/download-guide'),
  '/setup-network/:network/upload': require('../pages/setup-network/linkedin/upload'),
  '/surveys/:surveySlug': require('../pages/survey'),
  '/surveys/:surveySlug/sections/:sectionId': require('../pages/survey-section'),
  '/surveys/:surveySlug/sections/:sectionId/:questionType/:questionId': require('../pages/survey-question'),
  '/surveys/:surveySlug/complete': require('../pages/survey-complete'),
  '/messages': require('../pages/messages'),
  '/messages/:conversationId': require('../pages/messages/thread'),
  '/messages/new/:connectionId': require('../pages/messages/new'),
  '/messages/new/:connectionId/:jobId': require('../pages/messages/new/compose'),
  '/contacts': require('../pages/contacts'),
  // legacy urls
  '/': require('../pages/tasks'),
  '/jobs': require('../pages/jobs'),
  '/connections': require('../pages/connections'),
  '/connections/import': require('../pages/setup-network')
}
