const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')
const { ensureNoAccessRequestsPending } = require('../../lib/middleware')

const Router = ({ respondWithGql, ensureAuthorised }) => {
  const router = createRouter()
  router.use('/manage/surveys/:surveySlug/questions', ensureNoAccessRequestsPending, ensureAuthorised())

  router.getHandlers('/manage/surveys/:surveySlug/questions', respondWithGql(fetchers.get))
  router.patchHandlers('/manage/surveys/:surveySlug/questions', respondWithGql(fetchers.patch))

  return router
}

module.exports = Router
