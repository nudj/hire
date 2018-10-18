const { Global } = require('../../lib/graphql')

const get = async () => {
  const gql = `
    query fetchTeam {
      user {
        hirer {
          id
          company {
            hirers {
              id
              type
              person {
                firstName
                lastName
                email
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
