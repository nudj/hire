const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')

const Router = ({ ensureLoggedIn, respondWith }) => {
  const router = createRouter()
  router.use(ensureLoggedIn)

  router.getHandlers(
    '/surveys/:surveySlug/sections/:sectionId/:questionType/:questionId',
    respondWith(fetchers.get)
  )
  router.postHandlers(
    '/surveys/:surveySlug/sections/:sectionId/companies/:questionId',
    respondWith(fetchers.postFormerEmployer)
  )
  router.postHandlers(
    '/surveys/:surveySlug/sections/:sectionId/connections/:questionId',
    respondWith(fetchers.postConnection)
  )

  return router
}

module.exports = Router
