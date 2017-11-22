const express = require('express')

const { ensureHirerOnboardedEvent } = require('../lib/middleware')

const Router = ({ ensureLoggedIn }) => {
  const router = express.Router()
  router.use(ensureLoggedIn)

  router.get('/connections/import', (req, res, next) => next())
  router.all('*', ensureHirerOnboardedEvent)
  return router
}

module.exports = Router
