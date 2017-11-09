const { Global } = require('../../lib/graphql')

const get = ({
  session
}) => {
  const gql = `
    query TasksPage ($userId: ID!) {
      user (id: $userId) {
        hirer {
          company {
            name
            jobs {
              id
              created
              title
              slug
              location
              bonus
              internalMessages {
                id
              }
              externalMessages {
                id
              }
            }
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
