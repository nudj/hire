const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')
const { ensureOnboarded, ensureNoAccessRequestsPending } = require('../../lib/middleware')

const Router = ({ ensureLoggedIn, respondWithGql }) => {
  const router = createRouter()
  router.use('/messages/new/:recipientId/:jobId', ensureLoggedIn, ensureNoAccessRequestsPending, ensureOnboarded)

  router.getHandlers('/messages/new/:recipientId/:jobId', respondWithGql(fetchers.get))
  router.postHandlers('/messages/new/:recipientId/:jobId', respondWithGql(fetchers.post))

  return router
}

module.exports = Router
