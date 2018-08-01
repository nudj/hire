const createRouter = require('@nudj/framework/router')

const { ensureNotOnboarded, ensureNoAccessRequestsPending } = require('../../lib/middleware')
const fetchers = require('./fetchers')

const Router = ({ respondWithGql, ensureLoggedIn }) => {
  const router = createRouter()

  router.getHandlers('/welcome', ensureLoggedIn, ensureNoAccessRequestsPending, ensureNotOnboarded, respondWithGql(fetchers.get))

  return router
}

module.exports = Router
