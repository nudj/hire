const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')
const { ensureOnboarded } = require('../../lib/middleware')

const Router = ({
  ensureLoggedIn,
  respondWithGql
}) => {
  const router = createRouter()
  router.use(ensureLoggedIn)

  router.getHandlers('/contacts', ensureOnboarded, respondWithGql(fetchers.getContacts))
  router.postHandlers('/contacts', ensureOnboarded, respondWithGql(fetchers.postContact))

  return router
}

module.exports = Router
