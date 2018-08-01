const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')
const { ensureNoAccessRequestsPending } = require('../../lib/middleware')

const Router = ({ ensureLoggedIn, respondWithGql }) => {
  const router = createRouter()
  router.use('/share-jobs', ensureLoggedIn)
  router.use('/share-jobs', ensureNoAccessRequestsPending)

  router.getHandlers('/share-jobs', respondWithGql(fetchers.get))
  router.postHandlers('/share-jobs', respondWithGql(fetchers.post))

  return router
}

module.exports = Router
