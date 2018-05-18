const { Global } = require('../../lib/graphql')

const getApplications = ({ session }) => {
  const gql = `
    query GetApplications {
      user {
        emailPreference
        hirer {
          company {
            jobs {
              id
              title
              status
              created
              slug
              applications {
                id
                created
                person {
                  firstName
                  lastName
                  email
                  url
                  role {
                    name
                  }
                  company {
                    name
                  }
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
  return { gql }
}

module.exports = {
  getApplications
}
