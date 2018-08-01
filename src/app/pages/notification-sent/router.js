const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')
const { ensureNoAccessRequestsPending } = require('../../lib/middleware')

const Router = ({
  ensureLoggedIn,
  respondWithGql
}) => {
  const router = createRouter()
  router.use('/notification-sent', ensureLoggedIn)
  router.use('/notification-sent', ensureNoAccessRequestsPending)

  router.getHandlers('/notification-sent', respondWithGql(fetchers.getUser))

  return router
}

module.exports = Router
