const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')

const Router = ({ ensureLoggedIn, respondWithGql }) => {
  const router = createRouter()
  router.use(ensureLoggedIn)

  router.getHandlers('/surveys/:surveySlug/sections/:sectionId/:questionType/:questionId', respondWithGql(fetchers.getQuestion))
  router.postHandlers('/surveys/:surveySlug/sections/:sectionId/companies/:questionId', respondWithGql(fetchers.postEmployment))
  router.postHandlers('/surveys/:surveySlug/sections/:sectionId/connections/:questionId', respondWithGql(fetchers.postConnectionAnswer))
  router.postHandlers('/surveys/:surveySlug/sections/:sectionId/connections/:questionId/newConnection', respondWithGql(fetchers.postNewConnection))

  return router
}

module.exports = Router
