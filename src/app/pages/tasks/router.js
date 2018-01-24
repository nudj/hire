const { Redirect } = require('@nudj/library/errors')
const createRouter = require('@nudj/framework/router')

const { ensureOnboarded } = require('../../lib/middleware')

const Router = ({
  ensureLoggedIn,
  respondWithGql
}) => {
  const router = createRouter()
  router.use(ensureLoggedIn)

  router.getHandlers(
    '/',
    ensureOnboarded,
    (req, res, next) => next(new Redirect({ url: '/messages' })),
    respondWithGql()
  )

  return router
}

module.exports = Router
