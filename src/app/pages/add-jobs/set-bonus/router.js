const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')

const Router = ({ respondWithGql, ensureLoggedIn }) => {
  const router = createRouter()
  router.use('/jobs/:jobSlug/bonus', ensureLoggedIn)

  router.getHandlers('/jobs/:jobSlug/bonus', respondWithGql(fetchers.get))
  router.postHandlers('/jobs/:jobSlug/bonus', respondWithGql(fetchers.post))

  return router
}

module.exports = Router
