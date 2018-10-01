const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')
const {
  ensureLoggedOutOrOnboarded,
  ensureNoAccessRequestsPending
} = require('../../lib/middleware')

const Router = ({ respondWithGql }) => {
  const router = createRouter()

  router.getHandlers('/', ensureNoAccessRequestsPending, ensureLoggedOutOrOnboarded, respondWithGql(fetchers.get))

  return router
}

module.exports = Router
