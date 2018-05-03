const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')

const Router = ({ ensureLoggedIn, respondWithGql }) => {
  const router = createRouter()
  router.use(ensureLoggedIn)

  router.getHandlers('/invite-team', ensureLoggedIn, respondWithGql(fetchers.get))
  router.postHandlers('/invite-team', ensureLoggedIn, respondWithGql(fetchers.post))

  return router
}

module.exports = Router
