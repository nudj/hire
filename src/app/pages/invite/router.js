const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')
const {
  ensureOnboarded,
  ensureAdmin,
  ensureNoAccessRequestsPending
} = require('../../lib/middleware')

const Router = ({ ensureLoggedIn, respondWithGql }) => {
  const router = createRouter()
  router.use(
    '/invite',
    ensureLoggedIn,
    ensureNoAccessRequestsPending,
    ensureOnboarded,
    ensureAdmin
  )

  router.getHandlers('/invite', respondWithGql(fetchers.get))
  router.postHandlers('/invite', respondWithGql(fetchers.post))

  return router
}

module.exports = Router
