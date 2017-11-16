module.exports = {
  '/onboarding': require('../pages/onboarding'),
  '/onboarding/import': require('../pages/import'),
  '/onboarding/import/guide': require('../pages/import-guide'),
  '/onboarding/import/upload': require('../pages/import-upload'),
  '/onboarding/surveys/:surveySlug': require('../pages/survey'),
  '/onboarding/surveys/:surveySlug/sections/:sectionId': require('../pages/survey-section'),
  '/onboarding/surveys/:surveySlug/sections/:sectionId/:questionType/:questionId': require('../pages/survey-question'),
  '/onboarding/surveys/:surveySlug/complete': require('../pages/survey-complete'),
  '/': require('../pages/tasks'),
  '/jobs': require('../pages/jobs'),
  '/connections': require('../pages/connections'),
  '/connections/import': require('../pages/import'),
  '/connections/import/guide': require('../pages/import-guide'),
  '/connections/import/upload': require('../pages/import-upload'),
  '/surveys/:surveySlug': require('../pages/survey'),
  '/surveys/:surveySlug/sections/:sectionId': require('../pages/survey-section'),
  '/surveys/:surveySlug/sections/:sectionId/:questionType/:questionId': require('../pages/survey-question'),
  '/surveys/:surveySlug/complete': require('../pages/survey-complete'),
  '/conversations': require('../pages/conversations')
}
