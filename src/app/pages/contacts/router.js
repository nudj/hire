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

  router.getHandlers('/discover/job/:jobId', respondWithGql(fetchers.getContacts))
  router.postHandlers('/discover/job/:jobId', respondWithGql(fetchers.postContact))

  // Legacy URLs
  router.getHandlers('/discover', (req, res) => {
    res.redirect('/contacts')
  })

  return router
}

module.exports = Router
