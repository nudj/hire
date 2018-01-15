const { Global } = require('../../lib/graphql')

const getMessage = props => {
  return { gql, variables }
}

const getActiveJobs = (props) => {
  const { session, params } = props
  const gql = `
    query GetJobs($userId: ID!, $connectionId: ID!, $status: JobStatus) {
      user (id: $userId) {
        hirer {
          company {
            id
            jobs: jobsByFilters(filters: { status: $status }) {
              id
              title
              status
            }
          }
        }
        connection: connectionByFilters(filters: {id: $connectionId}) {
          firstName
          person {
            email
          }
        }
      }
    }
  `

  const variables = {
    userId: session.userId,
    connectionId: params.connectionId,
    status: 'PUBLISHED'
  }

  return { gql, variables }
}

const getMessageTemplate = (props) => {
  const { session, params } = props

  const gql = `
    query getTemplateAndDetails($userId: ID!, $connectionId: ID!, $jobId: ID!) {
      user(id: $userId) {
        firstName
        emailPreference
        hirer {
          company {
            job: jobByFilters(filters: {id: $jobId}) {
              title
              url
              templateTags
            }
          }
        }
        connection: connectionByFilters(filters: {id: $connectionId}) {
          firstName
        }
      }
      template: fetchTemplate(repo: "hirer", type: "composemessage", tags: ["formal", "new"])
    }
  `

  const variables = {
    userId: session.userId,
    connectionId: params.connectionId,
    jobId: params.jobId
  }

  return { gql, variables }
}

module.exports = {
  getActiveJobs,
  getMessageTemplate
}
