const express = require('express')
const { Global } = require('../../lib/graphql')

const get = ({ session }) => {
  const gql = `
    query Page ($userId: ID!) {
      user (id: $userId) {
        hirer {
          id
        }
      }
      ${Global}
    }
  `
  const variables = {
    userId: session.userId
  }
  return { gql, variables }
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
