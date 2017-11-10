const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')

const Router = ({
  ensureLoggedIn,
  respondWith
}) => {
  const router = createRouter()
  router.use(ensureLoggedIn)

  router.getHandlers('/surveys/:surveySlug', respondWith(fetchers.get))
  router.postHandlers('/surveys/:surveySlug/formerEmployer', respondWith(fetchers.postFormerEmployer))
  router.postHandlers('/surveys/:surveySlug/connection', respondWith(fetchers.postConnection))

  return router
}

module.exports = Router
