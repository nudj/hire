const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')

const Router = ({ ensureLoggedIn, respondWithGql }) => {
  const router = createRouter()
  router.use(ensureLoggedIn)

  router.getHandlers('/conversations', respondWithGql(fetchers.get))
  router.getHandlers(
    '/conversations/new/:connectionId',
    respondWithGql(fetchers.getActiveJobs)
  )

  return router
}

module.exports = Router
