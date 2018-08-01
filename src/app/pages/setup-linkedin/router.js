const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')
const { ensureNoAccessRequestsPending } = require('../../lib/middleware')

const Router = ({ ensureLoggedIn, respondWithGql }) => {
  const router = createRouter()
  router.use('/sync-contacts/linkedin/upload', ensureLoggedIn)
  router.use('/sync-contacts/linkedin/upload', ensureNoAccessRequestsPending)

  router.getHandlers(
    '/sync-contacts/linkedin/upload',
    respondWithGql(fetchers.fetchPageData)
  )
  router.postHandlers(
    '/sync-contacts/linkedin/upload',
    respondWithGql(fetchers.uploadConnections)
  )

  return router
}

module.exports = Router
