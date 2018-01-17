const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')

const Router = ({ ensureLoggedIn, respondWithGql }) => {
  const router = createRouter()
  router.use(ensureLoggedIn)

  router.getHandlers(
    '/surveys/:surveySlug/complete',
    respondWithGql(fetchers.completeSurvey)
  )
  router.postHandlers(
    '/surveys/:surveySlug/complete',
    respondWithGql(fetchers.setEmailPreference)
  )

  return router
}

module.exports = Router
