const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')

const { ensureNotOnboarded } = require('../../lib/middleware')

const Router = ({ respondWithGql, ensureLoggedIn }) => {
  const router = createRouter()
  router.use('/setup-jobs', ensureLoggedIn)

  router.getHandlers('/setup-jobs', ensureNotOnboarded, respondWithGql(fetchers.get))
  router.postHandlers('/setup-jobs', ensureNotOnboarded, respondWithGql(fetchers.post))

  return router
}

module.exports = Router
