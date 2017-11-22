const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')

const Router = ({ ensureLoggedIn, respondWith }) => {
  const router = createRouter()
  router.use(ensureLoggedIn)

  router.getHandlers('/connections/import/upload', respondWith(fetchers.get))
  router.postHandlers('/connections/import/upload', respondWith(fetchers.post))
  router.getHandlers('/onboarding/import/upload', respondWith(fetchers.get))
  router.postHandlers('/onboarding/import/upload', respondWith(fetchers.post))

  return router
}

module.exports = Router
