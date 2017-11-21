const { Global } = require('../../lib/graphql')

const get = ({ session }) => {
  const gql = `
    query ConnectionsPage ($userId: ID!) {
      user (id: $userId) {
        connections {
          id
          firstName
          lastName
          role {
            name
          }
          company {
            name
          }
          person {
            id
          }
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

module.exports = {
  get
}
