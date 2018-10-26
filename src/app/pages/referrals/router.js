const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')
const {
  ensureOnboarded,
  ensureNoAccessRequestsPending
} = require('../../lib/middleware')

const Router = ({
  ensureAuthorised,
  respondWithGql
}) => {
  const router = createRouter()
  router.use(
    '/referrals',
    ensureNoAccessRequestsPending,
    ensureAuthorised(),
    ensureOnboarded
  )

  router.getHandlers('/referrals', respondWithGql(fetchers.get))

  return router
}

module.exports = Router
