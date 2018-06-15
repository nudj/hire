const { cookies } = require('@nudj/library')
const get = require('lodash/get')
const { Redirect } = require('@nudj/framework/errors')

const { jobStatuses } = require('../../lib/constants')
const { Global } = require('../../lib/graphql')

const getGql = ({ session, query }) => {
  const gql = `
    mutation GetJobsAndMessageTemplates(
      $userId: ID!,
      $jobStatus: JobStatus
    ) {
      user {
        firstName
        emailPreference
        hirer {
          company {
            name
            slug
            jobs: jobsByFilters (filters: { status: $jobStatus }) {
              id
              title
              slug
              location
              tags
              bonus
              status
              referral: getOrCreateReferralForUser(person: $userId) {
                id
                slug
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

  return {
    gql,
    variables
  }
}

const postGql = ({ res }) => {
  const gql = `
    mutation SetOnboarded {
      user {
        hirer {
          onboarded
          setOnboarded
        }
      }
      ${Global}
    }
  `

  const respond = (data) => {
    const newlyOnboarded = !get(data, 'user.hirer.onboarded', false) && get(data, 'user.hirer.setOnboarded', false)
    if (newlyOnboarded) cookies.set(res, 'newlyOnboarded', true)

    throw new Redirect({
      url: '/'
    })
  }

  return {
    gql,
    respond
  }
}

module.exports = {
  get: getGql,
  post: postGql
}
