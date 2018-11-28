const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')

const { ensureOnboarded, ensureNoAccessRequestsPending } = require('../../lib/middleware')

const Router = ({ respondWithGql, ensureLoggedIn }) => {
  const router = createRouter()

  router.use('/manage/surveys/:surveySlug', ensureLoggedIn, ensureNoAccessRequestsPending, ensureOnboarded)
  router.getHandlers('/manage/surveys/:surveySlug', respondWithGql(fetchers.get))

  return router
}

module.exports = Router
