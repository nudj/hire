const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')
const { ensureOnboarded, ensureNoAccessRequestsPending } = require('../../lib/middleware')

const Router = ({
  ensureLoggedIn,
  respondWithGql
}) => {
  const router = createRouter()
  router.use('/contacts', ensureLoggedIn, ensureNoAccessRequestsPending, ensureOnboarded)

  router.getHandlers('/contacts', respondWithGql(fetchers.getContacts))
  router.postHandlers('/contacts', respondWithGql(fetchers.postContact))

  router.getHandlers('/contacts/job/:jobId', respondWithGql(fetchers.getContacts))
  router.postHandlers('/contacts/job/:jobId', respondWithGql(fetchers.postContact))

  return router
}

module.exports = Router
