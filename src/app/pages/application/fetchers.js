const { NotFound } = require('@nudj/framework/errors')
const { Global } = require('../../lib/graphql')

const get = ({ params }) => {
  const gql = `
    query fetchApplication (
      $applicationId: ID!
    ) {
      user {
        hirer {
          company {
            application (
              id: $applicationId
            ) {
              id
              created
              person {
                firstName
                lastName
                email
                url
              }
              referral {
                id
                person {
                  firstName
                  lastName
                  email
                }
              }
              job {
                title
              }
            }
          }
        }
      }
      ${Global}
    }
  `

  const variables = {
    applicationId: params.applicationId
  }

  const transformData = data => {
    if (!data.user.hirer.company.application) {
      throw new NotFound()
    }
    return data
  }

  return { gql, variables, transformData }
}

module.exports = { get }
