const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')

const { ensureNoAccessRequestsPending } = require('../../lib/middleware')

const Router = ({
  ensureLoggedIn,
  respondWithGql
}) => {
  const router = createRouter()
  router.use('/continue-onboarding', ensureLoggedIn)
  router.use('/continue-onboarding', ensureNoAccessRequestsPending)

  router.getHandlers('/continue-onboarding', respondWithGql(fetchers.sendMagicLink))

  return router
}

module.exports = Router
