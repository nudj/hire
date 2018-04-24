const { Global } = require('../../lib/graphql')

const get = ({
  session
}) => {
  const gql = `
    query TasksPage {
      user {
        hirer {
          company {
            name
            slug
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
  return { gql }
}

module.exports = {
  get
}
