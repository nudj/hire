const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')
const shareWithTeamFetchers = require('./share-with-team/fetchers')
const { ensureOnboarded, ensureAdmin } = require('../../lib/middleware')

const Router = ({ ensureLoggedIn, respondWithGql }) => {
  const router = createRouter()
  router.use('/jobs/share-with-team', ensureLoggedIn)

  router.getHandlers('/', ensureLoggedIn, ensureOnboarded, respondWithGql(fetchers.get))
  router.getHandlers(
    '/jobs/share-with-team',
    ensureAdmin,
    respondWithGql(shareWithTeamFetchers.get)
  )
  router.postHandlers(
    '/jobs/share-with-team',
    ensureAdmin,
    respondWithGql(shareWithTeamFetchers.post)
  )

  return router
}

module.exports = Router
