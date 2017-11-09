const { Global } = require('../../lib/graphql')

const get = ({
  session
}) => {
  const gql = `
    query TasksPage ($userEmail: String!) {
      user (email: $userEmail) {
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
    userEmail: session.userEmail
  }
  return { gql, variables }
}

module.exports = {
  get
}
