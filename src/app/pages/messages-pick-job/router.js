const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')
const { ensureOnboarded, ensureNoAccessRequestsPending } = require('../../lib/middleware')

const Router = ({ ensureLoggedIn, respondWithGql }) => {
  const router = createRouter()
  router.use('/messages/new/:recipientId', ensureLoggedIn, ensureNoAccessRequestsPending, ensureOnboarded)

  router.getHandlers('/messages/new/:recipientId', respondWithGql(fetchers.get))

  return router
}

module.exports = Router
