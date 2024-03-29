const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')

const { ensureAdmin, ensureNoAccessRequestsPending } = require('../../lib/middleware')

const Router = ({ respondWithGql, ensureLoggedIn }) => {
  const router = createRouter()
  router.use('/jobs/:jobSlug/edit', ensureLoggedIn, ensureNoAccessRequestsPending, ensureAdmin)

  router.getHandlers('/jobs/:jobSlug/edit', respondWithGql(fetchers.get))
  router.postHandlers('/jobs/:jobSlug/edit', respondWithGql(fetchers.post))

  return router
}

module.exports = Router
