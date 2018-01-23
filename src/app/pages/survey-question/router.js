const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')

const Router = ({ ensureLoggedIn, respondWithGql }) => {
  const router = createRouter()
  router.use(ensureLoggedIn)

  router.getHandlers('/surveys/:surveySlug/:sectionId/:questionType/:questionId', respondWithGql(fetchers.getQuestion))
  router.postHandlers('/surveys/:surveySlug/:sectionId/companies/:questionId', respondWithGql(fetchers.postEmployment))
  router.postHandlers('/surveys/:surveySlug/:sectionId/connections/:questionId', respondWithGql(fetchers.postConnectionAnswer))

  // ajax call to support new connection modal during survey
  router.postHandlers('/surveys/:surveySlug/:sectionId/connections/:questionId/newConnection', respondWithGql(fetchers.postNewConnection))

  return router
}

module.exports = Router
