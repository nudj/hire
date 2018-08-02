const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')
const { ensureOnboarded } = require('../../lib/middleware')

const Router = ({
  ensureLoggedIn,
  respondWithGql
}) => {
  const router = createRouter()
  router.use(ensureLoggedIn)

  router.getHandlers('/access-requests/:accessRequestSlug', ensureOnboarded, respondWithGql(fetchers.get))
  router.postHandlers('/access-requests/:accessRequestSlug', ensureOnboarded, respondWithGql(fetchers.post))

  return router
}

module.exports = Router
