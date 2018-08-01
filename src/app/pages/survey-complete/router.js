const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')
const { ensureNoAccessRequestsPending } = require('../../lib/middleware')

const Router = ({ ensureLoggedIn, respondWithGql }) => {
  const router = createRouter()
  router.use('/surveys/:surveySlug/complete', ensureLoggedIn, ensureNoAccessRequestsPending)

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
