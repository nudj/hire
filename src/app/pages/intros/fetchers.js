const { Global } = require('../../lib/graphql')
const { createEnumMap } = require('../../lib')

const get = async ({ requestGQL }) => {
  const enumValues = await requestGQL({
    gql: `
      {
        jobStatusTypes: __type(name: "JobStatus") {
          values: enumValues {
            name
          }
        }
        hirerTypes: __type(name: "HirerType") {
          values: enumValues {
            name
          }
        }
      }
    `
  })
  const jobStatusTypes = createEnumMap(enumValues.jobStatusTypes.values)
  const hirerTypes = createEnumMap(enumValues.hirerTypes.values)

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
              intros: introsForHirer {
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

  const transformData = data => {
    return {
      ...data,
      hirerTypes
    }
  }

  return {
    gql,
    variables,
    transformData
  }
}

module.exports = {
  get
}
