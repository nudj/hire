const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')
const { ensureOnboarded, ensureNoAccessRequestsPending } = require('../../lib/middleware')

const Router = ({
  ensureLoggedIn,
  respondWithGql
}) => {
  const router = createRouter()
  router.use('/discover', ensureLoggedIn, ensureNoAccessRequestsPending, ensureOnboarded)

  router.getHandlers('/discover', respondWithGql(fetchers.getContacts))
  router.postHandlers('/discover', respondWithGql(fetchers.postContact))

  router.getHandlers('/discover/job/:jobId', respondWithGql(fetchers.getContacts))
  router.postHandlers('/discover/job/:jobId', respondWithGql(fetchers.postContact))

  // Legacy URLs
  router.getHandlers('/contacts', (req, res) => {
    res.redirect('/discover')
  })

  return router
}

module.exports = Router
