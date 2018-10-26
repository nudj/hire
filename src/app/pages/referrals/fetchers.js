const { Global } = require('../../lib/graphql')

const get = ({ session, query }) => {
  const { parent } = query
  const gql = `
    query (
      $parent: ID
    ) {
      user {
        emailPreference
        hirer {
          company {
            jobs {
              title
              slug
              referrals: referralsForHirer (
                parent: $parent
              ) {
                id
                person {
                  firstName
                  lastName
                  email
                }
              }
            }
          }
        }
      }
      ${Global}
    }
  `
  const variables = { parent }
  return { gql, variables }
}

module.exports = {
  get
}
