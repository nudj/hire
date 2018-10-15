const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')

const { ensureOnboarded, ensureNoAccessRequestsPending } = require('../../lib/middleware')

const Router = ({ respondWithGql, ensureLoggedIn }) => {
  const router = createRouter()
  router.use('/intros/new', ensureLoggedIn, ensureNoAccessRequestsPending, ensureOnboarded)

  router.getHandlers('/intros/new', respondWithGql(fetchers.get))
  router.postHandlers('/intros/new', respondWithGql(fetchers.post))

  return router
}

module.exports = Router
