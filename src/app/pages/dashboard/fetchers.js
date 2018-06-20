const { cookies } = require('@nudj/library')
const { jobStatuses } = require('../../lib/constants')
const { Global } = require('../../lib/graphql')

const get = ({ req, res, session }) => {
  const gql = `
    mutation GetJobs($jobStatus: JobStatus!, $userId: ID!) {
      user {
        firstName
        emailPreference
        connectionsCount
        hirer {
          type
          id
          company {
            hirers {
              id
              type
            }
            name
            slug
            jobs: jobsByFilters(filters: {status: $jobStatus}) {
              id
              title
              slug
              location
              bonus
              referral: getOrCreateReferralForUser(person: $userId) {
                id
              }
            }
          }
        }
      }
      whatsappTemplate: fetchTemplate(repo: "hirer", type: "share-job", tags: ["whatsapp"])
      emailTemplate: fetchTemplate(repo: "hirer", type: "share-job", tags: ["email"])
      twitterTemplate: fetchTemplate(repo: "hirer", type: "share-job", tags: ["twitter"])
      linkedinTemplate: fetchTemplate(repo: "hirer", type: "share-job", tags: ["linkedin"])
      ${Global}
    }
  `

  const variables = {
    userId: session.userId,
    jobStatus: jobStatuses.PUBLISHED
  }

  const transformData = data => {
    const newlyOnboarded = cookies.get(req, 'newlyOnboarded')
    cookies.set(res, 'newlyOnboarded', false)

    return {
      ...data,
      newlyOnboarded: newlyOnboarded === 'true'
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
