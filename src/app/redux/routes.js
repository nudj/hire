const checkMobileDevice = require('../pages/check-device-wrapper')

module.exports = {
  '/': require('../pages/root'),
  '/access-requests/:accessRequestSlug': require('../pages/access-request'),
  '/applications': require('../pages/applications'),
  '/applications/:applicationId': require('../pages/application'),
  '/company-settings': require('../pages/company-settings'),
  '/contacts': require('../pages/contacts'),
  '/intros': require('../pages/intros'),
  '/intros/new': require('../pages/edit-intro'),
  '/intros/:introId': require('../pages/intro'),
  '/invitation-accept/:hash': require('../pages/invitation-accept'),
  '/team/invite': require('../pages/invite'),
  '/jobs/new': require('../pages/add-jobs'),
  '/jobs/share-with-team': require('../pages/share-with-team'),
  '/jobs/:jobSlug/bonus': require('../pages/add-jobs/set-bonus'),
  '/jobs/:jobSlug/edit': require('../pages/edit-jobs'),
  '/messages': require('../pages/messages'),
  '/messages/new/:recipientId': require('../pages/messages/new'),
  '/messages/new/:recipientId/:jobId': require('../pages/messages/new/compose'),
  '/messages/:conversationId': require('../pages/messages/thread'),
  '/notification-sent': require('../pages/notification-sent'),
  '/request-access/:companySlug': require('../pages/request-access'),
  '/setup-company': require('../pages/setup-company'),
  '/share-jobs': require('../pages/share-jobs'),
  '/surveys/:surveySlug': checkMobileDevice(require('../pages/survey')),
  '/surveys/:surveySlug/complete': checkMobileDevice(require('../pages/survey-complete')),
  '/surveys/:surveySlug/sections/:sectionId/:questionType/:questionId': checkMobileDevice(require('../pages/survey-question')),
  '/sync-contacts': checkMobileDevice(require('../pages/sync-contacts')),
  '/sync-contacts/linkedin': checkMobileDevice(require('../pages/setup-linkedin/request-data-guide')),
  '/sync-contacts/linkedin/download-data': checkMobileDevice(require('../pages/setup-linkedin/download-data-guide')),
  '/sync-contacts/linkedin/upload': checkMobileDevice(require('../pages/setup-linkedin/upload-connections')),
  '/team': require('../pages/team'),
  '/team/:hirerId': require('../pages/hirer'),
  '/team/:hirerId/edit': require('../pages/hirer-edit')
}
