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

  router.getHandlers('/jobs/:jobSlug/internal', respondWith(fetchers.get))
  router.postHandlers('/jobs/:jobSlug/internal', respondWith(fetchers.post)) //internalMessageSaveHandler)
  // router.getHandlers('/jobs/:jobSlug/internal/:messageId', respondWith(fetchers.getMessage)) //sendSavedInternalMessageHandler)
  // router.patchHandlers('/jobs/:jobSlug/internal/:messageId', respondWith(fetchers.patchMessage)) //patchInternalMessageHandler)

  return router
}

module.exports = Router
