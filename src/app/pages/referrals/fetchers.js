const { Global } = require('../../lib/graphql')
const { createEnumMap } = require('../../lib')

const get = async ({ requestGQL, session, query }) => {
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
    status: jobStatusTypes.PUBLISHED
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
