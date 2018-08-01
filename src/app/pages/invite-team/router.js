const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')
const { ensureAdmin, ensureNoAccessRequestsPending } = require('../../lib/middleware')

const Router = ({ ensureLoggedIn, respondWithGql }) => {
  const router = createRouter()
  router.use('/invite-team', ensureLoggedIn)
  router.use('/invite-team', ensureNoAccessRequestsPending)

  router.getHandlers('/invite-team', ensureLoggedIn, ensureAdmin, respondWithGql(fetchers.get))
  router.postHandlers('/invite-team', ensureLoggedIn, ensureAdmin, respondWithGql(fetchers.post))

  return router
}

module.exports = Router
