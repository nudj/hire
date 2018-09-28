const createRouter = require('@nudj/framework/router')

const {
  ensureNotOnboarded,
  ensureValidCompanyHash,
  ensureNoAccessRequestsPending
} = require('../../lib/middleware')
const fetchers = require('./fetchers')

const Router = ({ respondWithGql, ensureAuthorised }) => {
  const router = createRouter()
  router.use(
    '/invitation-accept/:hash',
    ensureValidCompanyHash,
    ensureNoAccessRequestsPending
  )

  router.getHandlers(
    '/invitation-accept/:hash',
    ensureNotOnboarded,
    respondWithGql(fetchers.getCompany)
  )

  router.getHandlers(
    '/invitation-accept/:hash/accept',
    ensureAuthorised(),
    respondWithGql(fetchers.acceptInvite)
  )

  return router
}

module.exports = Router
