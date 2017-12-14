const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')

const Router = ({ ensureLoggedIn, respondWithGql }) => {
  const router = createRouter()
  router.use(ensureLoggedIn)

  router.getHandlers(
    '/setup-network/linkedin/upload',
    respondWithGql(fetchers.get)
  )
  router.postHandlers(
    '/setup-network/linkedin/upload',
    respondWithGql(fetchers.post)
  )

  return router
}

module.exports = Router
