const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')
const { ensureCompanyOnboarded } = require('../../lib/middleware')

const Router = ({
  ensureLoggedIn,
  respondWithGql
}) => {
  const router = createRouter()
  router.use(ensureLoggedIn)
  router.use(ensureCompanyOnboarded)

  router.getHandlers('/jobs', respondWithGql(fetchers.get))

  return router
}

module.exports = Router
