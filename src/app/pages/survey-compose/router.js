const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')

const Router = ({
  ensureLoggedIn,
  respondWith
}) => {
  const router = createRouter()
  router.use(ensureLoggedIn)

// router.get('/survey-page', surveyPageHandler)
// router.post('/survey-page', surveyPageSendHandler)
// router.get('/survey-page/:messageId', sendSavedSurveyPageHandler)
// router.patch('/survey-page/:messageId', patchSurveyPageHandler)
  router.getHandlers('/send-survey', respondWith(fetchers.get))
  router.postHandlers('/send-survey', respondWith(fetchers.post))
  router.getHandlers('/send-survey/:messageId', respondWith(fetchers.getMessage))
  router.patchHandlers('/send-survey/:messageId', respondWith(fetchers.patchMessage))

  return router
}

module.exports = Router
