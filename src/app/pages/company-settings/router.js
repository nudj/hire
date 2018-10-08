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
    '/company-settings',
    ensureLoggedIn,
    ensureNoAccessRequestsPending,
    ensureOnboarded,
    ensureAdmin
  )

  router.getHandlers('/company-settings', respondWithGql(fetchers.get))
  router.postHandlers('/company-settings', respondWithGql(fetchers.post))

  return router
}

module.exports = Router
