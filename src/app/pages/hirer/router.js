const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')

const { ensureOnboarded, ensureNoAccessRequestsPending } = require('../../lib/middleware')

const Router = ({ respondWithGql, ensureLoggedIn }) => {
  const router = createRouter()

  router.use('/team/:hirerId', ensureLoggedIn, ensureNoAccessRequestsPending, ensureOnboarded)
  router.getHandlers('/team/:hirerId', respondWithGql(fetchers.get))
  router.deleteHandlers('/team/:hirerId', respondWithGql(fetchers.delete))

  return router
}

module.exports = Router
