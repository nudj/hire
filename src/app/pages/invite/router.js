const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')
const { ensureOnboarded, ensureAdmin } = require('../../lib/middleware')

const Router = ({ ensureLoggedIn, respondWithGql }) => {
  const router = createRouter()
  router.use(ensureLoggedIn)

  router.getHandlers('/invite', ensureOnboarded, ensureAdmin, respondWithGql(fetchers.get))
  router.postHandlers('/invite', ensureOnboarded, ensureAdmin, respondWithGql(fetchers.post))

  return router
}

module.exports = Router
