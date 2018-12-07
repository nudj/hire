const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')
const { ensureOnboarded, ensureNoAccessRequestsPending } = require('../../lib/middleware')

const Router = ({ ensureLoggedIn, respondWithGql }) => {
  const router = createRouter()
  router.use('/messages/:conversationId', ensureLoggedIn, ensureNoAccessRequestsPending, ensureOnboarded)

  router.getHandlers('/messages/:conversationId', respondWithGql(fetchers.get))
  router.postHandlers('/messages/:conversationId', respondWithGql(fetchers.post))

  return router
}

module.exports = Router
