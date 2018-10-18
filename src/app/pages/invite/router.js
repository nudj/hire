const createRouter = require('@nudj/framework/router')

const fetchers = require('./fetchers')
const {
  ensureOnboarded,
  ensureAdmin,
  ensureNoAccessRequestsPending
} = require('../../lib/middleware')

const Router = ({ ensureLoggedIn, respondWithGql }) => {
  const router = createRouter()
  router.use(
    '/team/invite',
    ensureLoggedIn,
    ensureNoAccessRequestsPending,
    ensureOnboarded,
    ensureAdmin
  )

  router.getHandlers('/team/invite', respondWithGql(fetchers.get))
  router.postHandlers('/team/invite', respondWithGql(fetchers.post))

  // Legacy URL
  router.getHandlers('/invite', (req, res) => {
    res.redirect('/team/invite')
  })

  return router
}

module.exports = Router
