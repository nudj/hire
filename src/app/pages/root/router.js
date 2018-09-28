const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')
const { ensureNotNewSignup } = require('../../lib/middleware')

const Router = ({ respondWithGql }) => {
  const router = createRouter()

  router.getHandlers('/', ensureNotNewSignup, respondWithGql(fetchers.get))

  return router
}

module.exports = Router
