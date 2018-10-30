const { Global } = require('../../lib/graphql')

const get = ({ session, query }) => {
  const { parent } = query
  const gql = `
    query (
      $parent: ID
      $withParent: Boolean!
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
      parent: referral (
        id: $parent
      ) @include(if: $withParent) {
        job {
          title
        }
        person {
          firstName
          lastName
          email
        }
      }
      ${Global}
    }
  `
  const variables = {
    parent,
    withParent: !!parent
  }
  return { gql, variables }
}

module.exports = {
  get
}
