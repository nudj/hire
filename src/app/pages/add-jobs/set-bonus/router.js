const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')

const Router = ({ respondWithGql }) => {
  const router = createRouter()

  router.getHandlers('/jobs/:jobSlug/bonus', respondWithGql(fetchers.get))
  router.postHandlers('/jobs/:jobSlug/bonus', respondWithGql(fetchers.post))

  return router
}

module.exports = Router
