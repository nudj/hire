const { Global } = require('../../lib/graphql')

const getUser = ({ session }) => {
  const gql = `
    query NotificationSentPage {
      user {
        email
      }
      ${Global}
    }
  `
  return { gql }
}

module.exports = { getUser }
