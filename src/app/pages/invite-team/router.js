const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')
const { ensureAdmin, ensureNoAccessRequestsPending } = require('../../lib/middleware')

const Router = ({ ensureLoggedIn, respondWithGql }) => {
  const router = createRouter()
  router.use('/invite-team', ensureLoggedIn, ensureNoAccessRequestsPending, ensureAdmin)

  router.getHandlers('/invite-team', respondWithGql(fetchers.get))
  router.postHandlers('/invite-team', respondWithGql(fetchers.post))

  return router
}

module.exports = Router
