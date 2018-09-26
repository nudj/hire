const createRouter = require('@nudj/framework/router')

/**
 * Legacy /welcome router
 *
 * Supports the old /welcome route that may well still be clicked by users in
 * their invite emails
 */
const Router = ({ respondWith, ensureLoggedIn }) => {
  const router = createRouter()

  router.getHandlers('/welcome', (req, res) => res.redirect('/'))

  return router
}

module.exports = Router
