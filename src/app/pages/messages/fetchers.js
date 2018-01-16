const { Global } = require('../../lib/graphql')

const getMessages = props => {
  const { session } = props

  const gql = `
    query GetMessages($userId: ID!) {
      user (id: $userId) {
        conversations {
          id
          type
          subject
          recipient {
            firstName
            lastName
            email
          }
          message: latestMessage {
            body
          }
        }
      }
    }
  `

  const variables = {
    userId: session.userId
  }

  return { gql, variables }
}

const getThread = props => {
  const { session, params } = props

  const gql = `
    query GetThread($userId: ID!, $conversationId: ID!) {
      user (id: $userId) {
        conversation: conversationByFilters(filters: { id: $conversationId }) {
          subject
          type
          recipient {
            firstName
            lastName
            email
          }
          messages {
            id
            body
            date
            from {
              firstName
              lastName
              email
            }
          }
        }
      }
    }
  `

  const variables = {
    userId: session.userId,
    conversationId: params.conversationId
  }

  return { gql, variables }
}

const replyTo = (props) => {
  const { session, params, body } = props

  const gql = `
    mutation ReplyTo ($userId: ID!, $conversationId: ID!, $body: String!) {
      user (id: $userId) {
        conversation: conversationByFilters(filters: { id: $conversationId }) {
          sendMessage (body: $body) {
            success
          }
          subject
          type
          recipient {
            firstName
            lastName
            email
          }
          messages {
            id
            body
            date
            from {
              firstName
              lastName
              email
            }
          }
        }
      }
    }    
  `

  const variables = {
    userId: session.userId,
    conversationId: params.conversationId,
    body: body.body
  }

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
  getMessages,
  getThread,
  getActiveJobs,
  getMessageTemplate
}
