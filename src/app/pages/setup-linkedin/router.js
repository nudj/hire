const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')

const Router = ({ ensureLoggedIn, respondWithGql }) => {
  const router = createRouter()
  router.use(ensureLoggedIn)

  router.getHandlers(
    '/setup-network/linkedin/upload',
    respondWithGql(fetchers.fetchPageData)
  )
  router.postHandlers(
    '/setup-network/linkedin/upload',
    respondWithGql(fetchers.uploadConnections)
  )

  return router
}

module.exports = Router
