const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')

const { ensureOnboarded, ensureNoAccessRequestsPending } = require('../../lib/middleware')

const Router = ({ respondWithGql, ensureLoggedIn }) => {
  const router = createRouter()
  router.use('/jobs/new', ensureLoggedIn)
  router.use('/jobs/new', ensureNoAccessRequestsPending)

  router.getHandlers('/jobs/new', ensureOnboarded, respondWithGql(fetchers.get))
  router.postHandlers('/jobs/new', ensureOnboarded, respondWithGql(fetchers.post))

  return router
}

module.exports = Router
