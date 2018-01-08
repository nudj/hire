const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')

const Router = ({ ensureLoggedIn, respondWithGql }) => {
  const router = createRouter()
  router.use(ensureLoggedIn)

  router.getHandlers('/surveys/:surveySlug/complete', respondWithGql(fetchers.get))
  router.getHandlers('/onboarding/surveys/:surveySlug/complete', respondWithGql(fetchers.get))

  return router
}

module.exports = Router
