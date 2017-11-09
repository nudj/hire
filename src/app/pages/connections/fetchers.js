const { Global } = require('../../lib/graphql')

const get = ({
  session
}) => {
  const gql = `
    query TasksPage ($userEmail: String!) {
      user (email: $userEmail) {
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
    userEmail: session.userEmail
  }
  return { gql, variables }
}

module.exports = {
  get
}
