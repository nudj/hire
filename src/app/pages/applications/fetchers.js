const { Global } = require('../../lib/graphql')

const getApplications = ({ session }) => {
  const gql = `
    query GetApplications($userId: ID!) {
      user(id: $userId) {
        emailPreference
        hirer {
          company {
            jobs {
              id
              title
              status
              created
              applications {
                id
                created
                person {
                  firstName
                  lastName
                  email
                  url
                  title
                  company
                }
                referral {
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
      }
      ${Global}
    }
  `

  const variables = {
    userId: session.userId
  }

  return {
    gql,
    variables
  }
}

module.exports = {
  getApplications
}
