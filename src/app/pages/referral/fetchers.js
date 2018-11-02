const { NotFound } = require('@nudj/framework/errors')
const { Global } = require('../../lib/graphql')

const get = ({ params }) => {
  const gql = `
    query (
      $referralId: ID!
    ) {
      user {
        id
        hirer {
          company {
            slug
            referral: referralForHirer (
              id: $referralId
            ) {
              id
              created
              person {
                id
                firstName
                lastName
                email
                url
              }
              parent {
                id
                person {
                  id
                  firstName
                  lastName
                  email
                }
              }
              job {
                title
                slug
              }
              children {
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
    referralId: params.referralId
  }

  const transformData = data => {
    if (!data.user.hirer.company.referral) {
      throw new NotFound()
    }
    return data
  }

  return { gql, variables, transformData }
}

module.exports = { get }
