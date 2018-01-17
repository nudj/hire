const { Redirect } = require('@nudj/framework/errors')

const { Global } = require('../../lib/graphql')

const getUser = ({ session }) => {
  const gql = `
    query NotificationSentPage ($userId: ID!) {
      user (id: $userId) {
        email
      }
      ${Global}
    }
  `
  const variables = {
    userId: session.userId
  }
  return { gql, variables }
}

module.exports = { getUser }
