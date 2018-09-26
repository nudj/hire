const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')
const {
  ensureAdmin,
  ensureNoAccessRequestsPending
} = require('../../lib/middleware')

const Router = ({ ensureLoggedIn, respondWithGql }) => {
  const router = createRouter()

  router.use('/jobs/share-with-team', ensureLoggedIn, ensureNoAccessRequestsPending, ensureAdmin)
  router.getHandlers('/jobs/share-with-team', respondWithGql(fetchers.get))
  router.postHandlers('/jobs/share-with-team', respondWithGql(fetchers.post))

  return router
}

module.exports = Router
