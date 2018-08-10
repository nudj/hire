const { Redirect } = require('@nudj/library/errors')
const createRouter = require('@nudj/framework/router')

const { ensureNoAccessRequestsPending } = require('../../lib/middleware')

const Router = ({ ensureLoggedIn, respondWithGql }) => {
  const router = createRouter()
  router.use('/favourites', ensureLoggedIn, ensureNoAccessRequestsPending)

  router.getHandlers(
    '/favourites',
    (req, res, next) => {
      next(
        new Redirect({
          url: '/discover?favourites=true'
        })
      )
    }
  )

  return router
}

module.exports = Router
