const { Global } = require('../../lib/graphql')

const get = async ({ requestGQL }) => {
  const gql = `
    query {
      user {
        hirer {
          company {
            surveys {
              id
              slug
              introTitle
              status
            }
          }
        }
      }
      ${Global}
    }
  `

  return { gql }
}

module.exports = {
  get
}
