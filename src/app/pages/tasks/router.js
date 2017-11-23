const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')
const { ensureHirerOnboardedEvent } = require('../../lib/middleware')

const Router = ({
  ensureLoggedIn,
  respondWith
}) => {
  const router = createRouter()
  router.use(ensureLoggedIn)

  router.getHandlers('/', ensureHirerOnboardedEvent, respondWith(fetchers.get))

  return router
}

module.exports = Router
