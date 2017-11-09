const { Global } = require('../../lib/graphql')

const get = ({
  session
}) => {
  const gql = `
    query TasksPage ($userEmail: String!) {
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
