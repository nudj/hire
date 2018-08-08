const createRouter = require('@nudj/framework/router')

const { ensureNotOnboarded, ensureNoAccessRequestsPending } = require('../../lib/middleware')

const Router = ({ respondWith, ensureLoggedIn }) => {
  const router = createRouter()

  router.getHandlers('/welcome', ensureNoAccessRequestsPending, ensureNotOnboarded, respondWith())

  return router
}

module.exports = Router
