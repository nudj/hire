const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')

const Router = ({ ensureLoggedIn, respondWithGql }) => {
  const router = createRouter()

  router.getHandlers('/integrations/:type', respondWithGql(fetchers.get))
  router.postHandlers('/integrations/:type', respondWithGql(fetchers.post))
  router.postHandlers('/integrations/:type/verify', respondWithGql(fetchers.verifyIntegration))
  router.patchHandlers('/integrations/:type', respondWithGql(fetchers.patch))

  return router
}

module.exports = Router
