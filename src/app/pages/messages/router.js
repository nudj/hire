const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')
const { ensureOnboarded, ensureNoAccessRequestsPending } = require('../../lib/middleware')

const Router = ({ ensureLoggedIn, respondWithGql }) => {
  const router = createRouter()
  router.use('/messages', ensureLoggedIn, ensureNoAccessRequestsPending, ensureOnboarded)

  router.getHandlers('/messages', respondWithGql(fetchers.getMessages))
  router.getHandlers('/messages/:conversationId', respondWithGql(fetchers.getThread))
  router.postHandlers('/messages/:conversationId', respondWithGql(fetchers.replyTo))
  router.getHandlers('/messages/new/:recipientId', respondWithGql(fetchers.getActiveJobs))
  router.getHandlers('/messages/new/:recipientId/:jobId', respondWithGql(fetchers.getMessageTemplate))
  router.postHandlers('/messages/new/:recipientId/:jobId', respondWithGql(fetchers.sendNewMessage))
  router.postHandlers(
    '/sync-google',
    ensureLoggedIn,
    ensureOnboarded,
    respondWithGql(fetchers.redirectToGoogleAuth)
  )

  return router
}

module.exports = Router
