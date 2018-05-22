const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')

const Router = ({ ensureLoggedIn, respondWithGql }) => {
  const router = createRouter()
  router.use(ensureLoggedIn)

  router.getHandlers('/share-jobs', respondWithGql(fetchers.get))
  router.postHandlers('/share-jobs', respondWithGql(fetchers.post))

  return router
}

module.exports = Router
