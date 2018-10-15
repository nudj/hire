const { Global } = require('../../lib/graphql')
const { createEnumMap } = require('../../lib')

const get = async ({ requestGQL }) => {
  const enumTypes = await requestGQL({
    gql: `
      {
        jobStatusTypes: __type(name: "JobStatus") {
          values: enumValues {
            name
          }
        }
      }
    `
  })
  const jobStatusTypes = createEnumMap(enumTypes.jobStatusTypes.values)

  const gql = `
    query fetchIntros ($status: JobStatus!) {
      user {
        hirer {
          company {
            jobs: jobsByFilters(filters: { status: $status }) {
              title
              created
              status
              slug
              intros {
                id
                created
                notes
                person {
                  firstName
                  lastName
                  email
                }
                candidate {
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

  const variables = {
    status: jobStatusTypes.PUBLISHED
  }

  return {
    gql,
    variables
  }
}

module.exports = {
  get
}
