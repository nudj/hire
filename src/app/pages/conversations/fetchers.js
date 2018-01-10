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
  getActiveJobs
}
