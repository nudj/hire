const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')

const Router = ({ ensureLoggedIn, respondWithGql }) => {
  const router = createRouter()
  router.use(ensureLoggedIn)

  router.getHandlers(
    '/messages/new/:connectionId',
    respondWithGql(fetchers.getActiveJobs)
  )
  router.getHandlers(
    '/messages/new/:connectionId/:jobId',
    respondWithGql(fetchers.getMessageTemplate)
  )

  return router
}

module.exports = Router
