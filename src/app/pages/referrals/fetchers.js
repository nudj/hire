const { Global } = require('../../lib/graphql')
const fetchEnums = require('../../lib/fetch-enums')

const get = async ({ requestGQL, session, query }) => {
  const {
    jobStatuses,
    hirerTypes
  } = await fetchEnums({
    jobStatuses: 'JobStatus',
    hirerTypes: 'HirerType'
  })

  const { parent } = query
  const gql = `
    query (
      $parent: ID
      $withParent: Boolean!
      $status: JobStatus!
    ) {
      user {
        id
        emailPreference
        hirer {
          company {
            jobs: jobsByFilters(filters: { status: $status }) {
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
          id
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
    withParent: !!parent,
    status: jobStatuses.PUBLISHED
  }
  const transformData = data => ({
    ...data,
    hirerTypes
  })

  return {
    gql,
    variables,
    transformData
  }
}

module.exports = {
  get
}
