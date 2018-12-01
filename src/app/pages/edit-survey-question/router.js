const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')

const { ensureOnboarded, ensureNoAccessRequestsPending } = require('../../lib/middleware')

const Router = ({ respondWithGql, ensureLoggedIn }) => {
  const router = createRouter()
  router.use('/manage/surveys', ensureLoggedIn, ensureNoAccessRequestsPending, ensureOnboarded)

  router.getHandlers('/manage/surveys/:surveySlug/questions/new', respondWithGql(fetchers.getNew))
  router.postHandlers('/manage/surveys/:surveySlug/questions/new', respondWithGql(fetchers.post))

  router.getHandlers('/manage/surveys/:surveySlug/questions/:questionId/edit', respondWithGql(fetchers.get))
  router.patchHandlers('/manage/surveys/:surveySlug/questions/:questionId/edit', respondWithGql(fetchers.patch))

  return router
}

module.exports = Router
