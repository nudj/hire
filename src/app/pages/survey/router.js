const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')
const { ensureNoAccessRequestsPending } = require('../../lib/middleware')

const Router = ({ ensureLoggedIn, respondWithGql }) => {
  const router = createRouter()

  router.getHandlers('/surveys/:surveySlug', ensureLoggedIn, ensureNoAccessRequestsPending, respondWithGql(fetchers.get))
  router.getHandlers('/onboarding/surveys/:surveySlug', ensureLoggedIn, ensureNoAccessRequestsPending, respondWithGql(fetchers.get))

  return router
}

module.exports = Router
