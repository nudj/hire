const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')

const { ensureOnboarded, ensureNoAccessRequestsPending } = require('../../lib/middleware')

const Router = ({ respondWithGql, ensureLoggedIn }) => {
  const router = createRouter()

  router.use('/team/:hirerId/edit', ensureLoggedIn, ensureNoAccessRequestsPending, ensureOnboarded)

  router.getHandlers('/team/:hirerId/edit', respondWithGql(fetchers.get))
  router.patchHandlers('/team/:hirerId/edit', respondWithGql(fetchers.patch))

  return router
}

module.exports = Router
