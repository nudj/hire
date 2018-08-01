const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')

const { ensureNotOnboarded, ensureNoAccessRequestsPending } = require('../../lib/middleware')

const Router = ({ respondWithGql, ensureLoggedIn }) => {
  const router = createRouter()
  router.use('/setup-jobs', ensureLoggedIn, ensureNoAccessRequestsPending, ensureNotOnboarded)

  router.getHandlers('/setup-jobs', respondWithGql(fetchers.get))
  router.postHandlers('/setup-jobs', respondWithGql(fetchers.post))

  return router
}

module.exports = Router
