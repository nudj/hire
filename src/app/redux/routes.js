const checkMobileDevice = require('../pages/check-device-wrapper')

module.exports = {
  '/welcome': checkMobileDevice(require('../pages/welcome')),
  '/setup-network': checkMobileDevice(require('../pages/setup-network')),
  '/setup-network/:network': checkMobileDevice(require('../pages/setup-network/linkedin/request-guide')),
  '/setup-network/:network/download-data': checkMobileDevice(require('../pages/setup-network/linkedin/download-guide')),
  '/setup-network/:network/upload': checkMobileDevice(require('../pages/setup-network/linkedin/upload')),
  '/surveys/:surveySlug': checkMobileDevice(require('../pages/survey')),
  '/surveys/:surveySlug/sections/:sectionId/:questionType/:questionId': checkMobileDevice(require('../pages/survey-question')),
  '/surveys/:surveySlug/complete': checkMobileDevice(require('../pages/survey-complete')),
  '/recommendations': require('../pages/recommendations'),
  '/messages': require('../pages/messages'),
  '/messages/:conversationId': require('../pages/messages/thread'),
  '/messages/new/:connectionId': require('../pages/messages/new'),
  '/messages/new/:connectionId/:jobId': require('../pages/messages/new/compose'),
  '/contacts': require('../pages/contacts'),
  '/notification-sent': require('../pages/notification-sent')
}
