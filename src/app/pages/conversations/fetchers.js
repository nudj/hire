const { Global } = require('../../lib/graphql')

const getActiveJobs = (props) => {
  const { session, params } = props
  const gql = `
    query GetJobs($userId: ID!, $connectionId: ID!, $status: JobStatus) {
      user (id: $userId) {
        hirer {
          company {
            jobs: jobsByFilters(filters: { status: $status }) {
              id
              title
              status
            }
          }
        }
        connection: connectionByFilters(filters: {id: $connectionId}) {
          firstName
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

const get = ({
  session
}) => {
  const gql = `
    query TasksPage ($userId: ID!) {
      ${Global}
    }
  `
  const variables = {
    userId: session.userId
  }
  return { gql, variables }
}

module.exports = {
  get,
  getActiveJobs,
  getMessageTemplate
}
