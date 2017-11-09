const { Global } = require('../../lib/graphql')

const get = ({
  session
}) => {
  const gql = `
    query TasksPage ($userId: ID!) {
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
