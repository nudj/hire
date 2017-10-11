const express = require('express')

const Router = ({
  ensureLoggedIn,
  respondWith
}) => {
  const router = express.Router()
  router.use(ensureLoggedIn)

  router.get('*', respondWith(({ data }) => Promise.resolve(data)))

  return router
}

module.exports = Router
