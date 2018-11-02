const { Global } = require('../../lib/graphql')
const fetchEnums = require('../../lib/fetch-enums')

const get = async ({ requestGQL }) => {
  const {
    jobStatuses,
    hirerTypes
  } = await fetchEnums({
    jobStatuses: 'JobStatus',
    hirerTypes: 'HirerType'
  })

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
    status: jobStatuses.PUBLISHED
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
