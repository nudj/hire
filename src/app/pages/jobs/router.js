const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')
const shareWithTeamFetchers = require('./share-with-team/fetchers')
const {
  ensureOnboarded,
  ensureAdmin,
  ensureNoAccessRequestsPending
} = require('../../lib/middleware')

const Router = ({ ensureLoggedIn, respondWithGql }) => {
  const router = createRouter()
  router.use('/jobs/share-with-team', ensureLoggedIn, ensureNoAccessRequestsPending, ensureAdmin)

  router.getHandlers(
    '/',
    ensureLoggedIn,
    ensureNoAccessRequestsPending,
    ensureOnboarded,
    respondWithGql(fetchers.get)
  )
  router.getHandlers('/jobs/share-with-team', respondWithGql(shareWithTeamFetchers.get))
  router.postHandlers('/jobs/share-with-team', respondWithGql(shareWithTeamFetchers.post))

  return router
}

module.exports = Router
