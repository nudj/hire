const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')
const { ensureOnboarded, ensureNoAccessRequestsPending } = require('../../lib/middleware')

const Router = ({ ensureLoggedIn, respondWithGql }) => {
  const router = createRouter()
  router.use('/messages', ensureLoggedIn, ensureNoAccessRequestsPending, ensureOnboarded)

  router.getHandlers('/messages', respondWithGql(fetchers.getMessages))
  router.postHandlers(
    '/sync-google',
    ensureLoggedIn,
    ensureOnboarded,
    respondWithGql(fetchers.redirectToGoogleAuth)
  )

  return router
}

module.exports = Router
