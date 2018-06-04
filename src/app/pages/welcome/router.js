const createRouter = require('@nudj/framework/router')

const { ensureNotOnboarded } = require('../../lib/middleware')
const fetchers = require('./fetchers')

const Router = ({ respondWithGql }) => {
  const router = createRouter()

  router.getHandlers('/welcome', ensureNotOnboarded, respondWithGql(fetchers.get))

  return router
}

module.exports = Router
