const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')
const { ensureOnboarded, ensureNoAccessRequestsPending } = require('../../lib/middleware')

const Router = ({ ensureLoggedIn, respondWithGql }) => {
  const router = createRouter()
  router.use('/messages', ensureLoggedIn)
  router.use('/messages', ensureNoAccessRequestsPending)

  router.getHandlers(
    '/messages',
    ensureOnboarded,
    respondWithGql(fetchers.getMessages)
  )

  router.getHandlers(
    '/messages/:conversationId',
    ensureOnboarded,
    respondWithGql(fetchers.getThread)
  )

  router.postHandlers(
    '/messages/:conversationId',
    ensureOnboarded,
    respondWithGql(fetchers.replyTo)
  )

  router.getHandlers(
    '/messages/new/:recipientId',
    ensureOnboarded,
    respondWithGql(fetchers.getActiveJobs)
  )

  router.getHandlers(
    '/messages/new/:recipientId/:jobId',
    ensureOnboarded,
    respondWithGql(fetchers.getMessageTemplate)
  )

  router.postHandlers(
    '/messages/new/:recipientId/:jobId',
    ensureOnboarded,
    respondWithGql(fetchers.sendNewMessage)
  )

  router.postHandlers(
    '/sync-google',
    ensureLoggedIn,
    ensureOnboarded,
    respondWithGql(fetchers.redirectToGoogleAuth)
  )

  return router
}

module.exports = Router
