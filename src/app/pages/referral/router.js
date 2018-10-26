const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')

const { ensureOnboarded, ensureNoAccessRequestsPending } = require('../../lib/middleware')

const Router = ({ respondWithGql, ensureLoggedIn }) => {
  const router = createRouter()
  router.use('/referrals/:referralId', ensureLoggedIn, ensureNoAccessRequestsPending, ensureOnboarded)

  router.getHandlers('/referrals/:referralId', respondWithGql(fetchers.get))

  return router
}

module.exports = Router
