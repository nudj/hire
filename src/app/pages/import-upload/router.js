const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')

const Router = ({ ensureLoggedIn, respondWithGql }) => {
  const router = createRouter()
  router.use(ensureLoggedIn)

  router.getHandlers('/connections/import/upload', respondWithGql(fetchers.get))
  router.postHandlers('/connections/import/upload', respondWithGql(fetchers.post))
  router.getHandlers('/onboarding/import/upload', respondWithGql(fetchers.get))
  router.postHandlers('/onboarding/import/upload', respondWithGql(fetchers.post))

  return router
}

module.exports = Router
