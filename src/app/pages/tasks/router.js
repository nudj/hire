const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')
const { ensureHirerOnboarded } = require('../../server/lib/middleware')

const Router = ({
  ensureLoggedIn,
  respondWith
}) => {
  const router = createRouter()
  router.use(ensureLoggedIn)
  // router.use(ensureHirerOnboarded)

  router.getHandlers('/', ensureHirerOnboarded, respondWith(fetchers.get))

  return router
}

module.exports = Router
