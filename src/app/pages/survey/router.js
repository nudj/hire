const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')

const Router = ({ ensureLoggedIn, respondWithGql }) => {
  const router = createRouter()

  router.getHandlers('/surveys/:surveySlug', ensureLoggedIn, respondWithGql(fetchers.get))
  router.getHandlers('/onboarding/surveys/:surveySlug', ensureLoggedIn, respondWithGql(fetchers.get))

  return router
}

module.exports = Router
