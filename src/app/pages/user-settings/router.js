const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')
const {
  ensureOnboarded,
  ensureNoAccessRequestsPending
} = require('../../lib/middleware')

const Router = ({ ensureLoggedIn, respondWithGql }) => {
  const router = createRouter()
  router.use(
    '/user-settings',
    ensureLoggedIn,
    ensureNoAccessRequestsPending,
    ensureOnboarded
  )

  router.postHandlers('/user-settings', respondWithGql(fetchers.post))

  return router
}

module.exports = Router
