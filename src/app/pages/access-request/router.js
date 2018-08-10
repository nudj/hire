const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')
const { ensureOnboarded } = require('../../lib/middleware')

const Router = ({
  ensureLoggedIn,
  respondWithGql
}) => {
  const router = createRouter()
  router.use('/access-requests/:accessRequestSlug', ensureLoggedIn, ensureOnboarded)

  router.getHandlers('/access-requests/:accessRequestSlug', respondWithGql(fetchers.get))
  router.postHandlers('/access-requests/:accessRequestSlug', respondWithGql(fetchers.post))

  return router
}

module.exports = Router
