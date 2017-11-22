const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')

const Router = ({ ensureLoggedIn, respondWith }) => {
  const router = createRouter()
  router.use(ensureLoggedIn)

  router.getHandlers('/surveys/:surveySlug', respondWith(fetchers.get))
  router.getHandlers('/onboarding/surveys/:surveySlug', respondWith(fetchers.get))

  return router
}

module.exports = Router
