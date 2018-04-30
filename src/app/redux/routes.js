const checkMobileDevice = require('../pages/check-device-wrapper')

module.exports = {
  '/': require('../pages/dashboard'),
  '/welcome': checkMobileDevice(require('../pages/welcome')),
  '/invite-team': checkMobileDevice(require('../pages/invite-team')),
  '/get-started': checkMobileDevice(require('../pages/get-started')),
  '/setup-network': checkMobileDevice(require('../pages/setup-network')),
  '/setup-network/linkedin': checkMobileDevice(require('../pages/setup-linkedin/request-data-guide')),
  '/setup-network/linkedin/download-data': checkMobileDevice(require('../pages/setup-linkedin/download-data-guide')),
  '/setup-network/linkedin/upload': checkMobileDevice(require('../pages/setup-linkedin/upload-connections')),
  '/surveys/:surveySlug': checkMobileDevice(require('../pages/survey')),
  '/surveys/:surveySlug/sections/:sectionId/:questionType/:questionId': checkMobileDevice(require('../pages/survey-question')),
  '/surveys/:surveySlug/complete': checkMobileDevice(require('../pages/survey-complete')),
  '/messages': require('../pages/messages'),
  '/messages/:conversationId': require('../pages/messages/thread'),
  '/messages/new/:recipientId': require('../pages/messages/new'),
  '/messages/new/:recipientId/:jobId': require('../pages/messages/new/compose'),
  '/contacts': require('../pages/contacts'),
  '/contacts/job/:jobId': require('../pages/contacts'),
  '/applications': require('../pages/applications'),
  '/notification-sent': require('../pages/notification-sent'),
  '/invite': require('../pages/invite')
}
