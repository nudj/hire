const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')

const Router = ({ ensureLoggedIn, respondWith }) => {
  const router = createRouter()
  router.use(ensureLoggedIn)

  router.getHandlers('/connections/import', respondWith(fetchers.get))
  router.postHandlers('/connections/import', respondWith(fetchers.post))

  return router
}

module.exports = Router
