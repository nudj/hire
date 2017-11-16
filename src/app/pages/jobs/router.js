const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')
const { ensureCompanyOnboarded } = require('../../server/lib/middleware')

const Router = ({
  ensureLoggedIn,
  respondWith
}) => {
  const router = createRouter()
  router.use(ensureLoggedIn)
  router.use(ensureCompanyOnboarded)

  router.getHandlers('/jobs', respondWith(fetchers.get))

  return router
}

module.exports = Router
