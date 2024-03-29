const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')

const {
  ensureNotOnboarded,
  ensureNoAccessRequestsPending,
  ensureNotHirer
} = require('../../lib/middleware')

const Router = ({ respondWithGql, ensureLoggedIn }) => {
  const router = createRouter()
  router.use('/setup-company', ensureLoggedIn, ensureNoAccessRequestsPending, ensureNotHirer, ensureNotOnboarded)

  router.getHandlers('/setup-company', respondWithGql(fetchers.get))
  router.postHandlers('/setup-company', respondWithGql(fetchers.post))

  return router
}

module.exports = Router
