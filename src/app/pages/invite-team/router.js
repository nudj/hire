const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')
const { ensureAdmin } = require('../../lib/middleware')

const Router = ({ ensureLoggedIn, respondWithGql }) => {
  const router = createRouter()
  router.use(ensureLoggedIn)

  router.getHandlers('/invite-team', ensureLoggedIn, ensureAdmin, respondWithGql(fetchers.get))
  router.postHandlers('/invite-team', ensureLoggedIn, ensureAdmin, respondWithGql(fetchers.post))

  return router
}

module.exports = Router
