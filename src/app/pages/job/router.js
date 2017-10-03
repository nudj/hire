const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')
const { ensureOnboarded } = require('../../server/lib/middleware')

const Router = ({
  ensureLoggedIn,
  respondWith
}) => {
  const router = createRouter()
  router.use(ensureLoggedIn)
  router.use(ensureOnboarded)

  router.getHandlers('/jobs/:jobSlug', respondWith(fetchers.get))

  return router
}

module.exports = Router
