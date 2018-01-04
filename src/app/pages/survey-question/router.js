const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')

const Router = ({ ensureLoggedIn, respondWithGql }) => {
  const router = createRouter()
  router.use(ensureLoggedIn)

  router.getHandlers('/surveys/:surveySlug/sections/:sectionId/:questionType/:questionId', respondWithGql(fetchers.getQuestion))
  router.postHandlers('/surveys/:surveySlug/sections/:sectionId/companies/:questionId', respondWithGql(fetchers.postFormerEmployer))
  router.postHandlers('/surveys/:surveySlug/sections/:sectionId/connections/:questionId', respondWithGql(fetchers.postConnection))
  router.getHandlers('/onboarding/surveys/:surveySlug/sections/:sectionId/:questionType/:questionId', respondWithGql(fetchers.get))
  router.postHandlers('/onboarding/surveys/:surveySlug/sections/:sectionId/companies/:questionId', respondWithGql(fetchers.postFormerEmployer))
  router.postHandlers('/onboarding/surveys/:surveySlug/sections/:sectionId/connections/:questionId', respondWithGql(fetchers.postConnection))

  return router
}

module.exports = Router
