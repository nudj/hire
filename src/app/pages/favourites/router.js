const { Redirect } = require('@nudj/library/errors')
const createRouter = require('@nudj/framework/router')

const Router = ({ ensureLoggedIn, respondWithGql }) => {
  const router = createRouter()
  router.use(ensureLoggedIn)

  router.getHandlers(
    '/favourites',
    (req, res, next) => {
      next(
        new Redirect({
          url: '/contacts?favourites=true'
        })
      )
    }
  )

  return router
}

module.exports = Router
