const express = require('express')
const { Global } = require('../../lib/graphql')

const get = () => {
  const gql = `
    query Page {
      user {
        hirer {
          id
        }
      }
      ${Global}
    }
  `
  return { gql }
}

const Router = ({
  ensureLoggedIn,
  respondWithGql
}) => {
  const router = express.Router()
  router.use(ensureLoggedIn)

  router.get('*', respondWithGql(get))

  return router
}

module.exports = Router
