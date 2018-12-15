const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')

const { ensureOnboarded, ensureNoAccessRequestsPending } = require('../../lib/middleware')

const Router = ({ respondWithGql, ensureLoggedIn }) => {
  const router = createRouter()
  router.use('/jobs/new', ensureLoggedIn, ensureNoAccessRequestsPending, ensureOnboarded)

  router.getHandlers('/jobs/new', respondWithGql(fetchers.get))
  router.postHandlers('/jobs/new', respondWithGql(fetchers.post))

  return router
}

module.exports = Router
