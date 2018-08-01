const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')
const { ensureNotOnboarded } = require('../../lib/middleware')

const Router = ({
  ensureLoggedIn,
  respondWithGql
}) => {
  const router = createRouter()

  router.getHandlers('/request-access/:companySlug', ensureNotOnboarded, respondWithGql(fetchers.get))
  router.postHandlers('/request-access/:companySlug', ensureNotOnboarded, respondWithGql(fetchers.post))

  return router
}

module.exports = Router
