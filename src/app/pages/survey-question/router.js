const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')
const { ensureNoAccessRequestsPending } = require('../../lib/middleware')

const Router = ({ ensureLoggedIn, respondWithGql }) => {
  const router = createRouter()
  router.use('/surveys/:surveySlug', ensureLoggedIn, ensureNoAccessRequestsPending)

  router.getHandlers('/surveys/:surveySlug/questions/:questionId', respondWithGql(fetchers.get))
  router.postHandlers('/surveys/:surveySlug/questions/:questionId', respondWithGql(fetchers.post))

  // ajax call to support new connection modal during survey
  router.postHandlers('/surveys/:surveySlug/questions/:questionId/newConnection', respondWithGql(fetchers.postNewConnection))

  return router
}

module.exports = Router
