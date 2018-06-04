const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')

const { ensureOnboarded } = require('../../lib/middleware')

const Router = ({ respondWithGql }) => {
  const router = createRouter()

  router.getHandlers('/jobs/new', ensureOnboarded, respondWithGql(fetchers.get))
  router.postHandlers('/jobs/new', ensureOnboarded, respondWithGql(fetchers.post))

  return router
}

module.exports = Router
