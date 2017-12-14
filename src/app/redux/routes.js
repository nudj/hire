module.exports = {
  '/onboarding': require('../pages/onboarding'),
  '/setup-network': require('../pages/setup-network'),
  '/setup-network/:network': require('../pages/setup-network/linkedin/request-guide'),
  '/setup-network/:network/download-data': require('../pages/setup-network/linkedin/download-guide'),
  '/setup-network/:network/upload': require('../pages/setup-network/linkedin/upload'),
  '/onboarding/surveys/:surveySlug': require('../pages/survey'),
  '/onboarding/surveys/:surveySlug/sections/:sectionId': require('../pages/survey-section'),
  '/onboarding/surveys/:surveySlug/sections/:sectionId/:questionType/:questionId': require('../pages/survey-question'),
  '/onboarding/surveys/:surveySlug/complete': require('../pages/survey-complete'),
  '/': require('../pages/tasks'),
  '/jobs': require('../pages/jobs'),
  '/connections': require('../pages/connections'),
  '/connections/import': require('../pages/import'),
  '/surveys/:surveySlug': require('../pages/survey'),
  '/surveys/:surveySlug/sections/:sectionId': require('../pages/survey-section'),
  '/surveys/:surveySlug/sections/:sectionId/:questionType/:questionId': require('../pages/survey-question'),
  '/surveys/:surveySlug/complete': require('../pages/survey-complete'),
  '/conversations': require('../pages/conversations')
}
