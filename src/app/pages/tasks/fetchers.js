const { Global } = require('../../lib/graphql')

const get = ({
  session
}) => {
  const gql = `
    query TasksPage ($userEmail: String!) {
      user (email: $userEmail) {
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
    userEmail: session.userEmail
  }
  return { gql, variables }
}

module.exports = {
  get
}
