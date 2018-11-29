const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')

const { ensureOnboarded, ensureNoAccessRequestsPending } = require('../../lib/middleware')

const Router = ({ respondWithGql, ensureLoggedIn }) => {
  const router = createRouter()
  router.use('/manage/surveys', ensureLoggedIn, ensureNoAccessRequestsPending, ensureOnboarded)

  router.getHandlers('/manage/surveys/new', respondWithGql(fetchers.getNew))
  router.postHandlers('/manage/surveys/new', respondWithGql(fetchers.post))

  router.getHandlers('/manage/surveys/:surveySlug/edit', respondWithGql(fetchers.get))
  router.patchHandlers('/manage/surveys/:surveySlug/edit', respondWithGql(fetchers.patch))

  return router
}

module.exports = Router
