const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')
const {
  ensureOnboarded,
  ensureAdmin,
  ensureNoAccessRequestsPending
} = require('../../lib/middleware')

const Router = ({
  ensureLoggedIn,
  respondWithGql
}) => {
  const router = createRouter()
  router.use(
    '/applications',
    ensureLoggedIn,
    ensureNoAccessRequestsPending,
    ensureOnboarded,
    ensureAdmin
  )

  router.getHandlers('/applications', respondWithGql(fetchers.getApplications))

  return router
}

module.exports = Router
