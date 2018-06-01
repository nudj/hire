const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')

const { ensureNotOnboarded } = require('../../lib/middleware')

const Router = ({ respondWithGql }) => {
  const router = createRouter()

  router.getHandlers('/setup-company', ensureNotOnboarded, respondWithGql(fetchers.get))
  router.postHandlers('/setup-company', ensureNotOnboarded, respondWithGql(fetchers.post))

  return router
}

module.exports = Router
