const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')
const { ensureNoAccessRequestsPending } = require('../../lib/middleware')

const Router = ({ respondWithGql, ensureAuthorised }) => {
  const router = createRouter()

  router.getHandlers('/surveys', ensureNoAccessRequestsPending, ensureAuthorised(), respondWithGql(fetchers.get))

  return router
}

module.exports = Router
