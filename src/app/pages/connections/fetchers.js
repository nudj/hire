const { Global } = require('../../lib/graphql')

const get = ({
  session
}) => {
  const gql = `
    query TasksPage ($userId: ID!) {
      user (id: $userId) {
        connections {
          id
          to {
            id
            firstName
            lastName
            title
            company
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
