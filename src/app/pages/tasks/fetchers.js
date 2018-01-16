const { Global } = require('../../lib/graphql')

const get = ({
  session
}) => {
  const gql = `
    query TasksPage ($userId: ID!) {
      user (id: $userId) {
        id
        firstName
        tasks {
          id
          modified
          type
          completed
        }
        hirer {
          company {
            tasks {
              id
              modified
              type
              completed
              completedBy {
                id
                firstName
                lastName
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
