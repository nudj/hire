const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')
const { ensureOnboarded, ensureNoAccessRequestsPending } = require('../../lib/middleware')

const Router = ({
  ensureLoggedIn,
  respondWithGql
}) => {
  const router = createRouter()
  router.use('/contacts', ensureLoggedIn)
  router.use('/contacts', ensureNoAccessRequestsPending)

  router.getHandlers('/contacts', ensureOnboarded, respondWithGql(fetchers.getContacts))
  router.postHandlers('/contacts', ensureOnboarded, respondWithGql(fetchers.postContact))

  router.getHandlers('/contacts/job/:jobId', ensureOnboarded, respondWithGql(fetchers.getContacts))
  router.postHandlers('/contacts/job/:jobId', ensureOnboarded, respondWithGql(fetchers.postContact))

  return router
}

module.exports = Router
