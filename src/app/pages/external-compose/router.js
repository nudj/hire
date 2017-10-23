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

  router.getHandlers('/jobs/:jobSlug/external/:messageId', respondWith(fetchers.get))
  router.patchHandlers('/jobs/:jobSlug/external/:messageId', respondWith(fetchers.patch))
  router.postHandlers('/jobs/:jobSlug/external/:messageId', respondWith(fetchers.post))
  router.getHandlers('/jobs/:jobSlug/external/:messageId/authenticate', respondWith(fetchers.getAuthentication))

  return router
}

module.exports = Router
