const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')

const Router = ({ respondWithGql }) => {
  const router = createRouter()

  router.getHandlers('/', respondWithGql(fetchers.get))

  return router
}

module.exports = Router
