const { Redirect } = require('@nudj/library/errors')

const { createNotification } = require('../../lib')
const { Global } = require('../../lib/graphql')

const getMessages = props => {
  const { session } = props

  const gql = `
    query GetMessages($userId: ID!) {
      user (id: $userId) {
        emailPreference
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
      ${Global}
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
        emailPreference
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
      ${Global}
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

  // TODO: API side validation
  if (body.body.length > 0) {
    const gql = `
      mutation ReplyTo ($userId: ID!, $conversationId: ID!, $body: String!) {
        user (id: $userId) {
          conversation: conversationByFilters(filters: { id: $conversationId }) {
            newMessage: sendMessage(body: $body) {
              id
              body
              date
              from {
                firstName
                lastName
                email
              }
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
        ${Global}
      }
    `

    const variables = {
      userId: session.userId,
      conversationId: params.conversationId,
      body: body.body
    }

    return {
      gql,
      variables,
      respond: () => {
        // prevents multiple submissions on refresh
        throw new Redirect({ url: `/messages/${params.conversationId}` })
      }
    }
  } else {
    return {
      respond: () => {
        // prevents multiple submissions on refresh
        throw new Redirect({
          url: `/messages/${params.conversationId}`,
          notification: createNotification(
            'error',
            "You can't send an empty message"
          )
        })
      }
    }
  }
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
      ${Global}
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
    query getTemplateAndDetails(
      $userId: ID!,
      $connectionId: ID!,
      $jobId: ID!,
      $repo: String!,
      $templateType: String!,
      $templateTags: [String!]!
    ) {
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
      template: fetchTemplate(repo: $repo, type: $templateType, tags: $templateTags)
      ${Global}
    }
  `

  const variables = {
    userId: session.userId,
    connectionId: params.connectionId,
    jobId: params.jobId,
    repo: 'hirer',
    templateType: 'composemessage',
    templateTags: [
      'external',
      'long',
      'familiar'
    ]
  }

  return { gql, variables }
}

const sendNewMessage = ({ session, params, body }) => {
  const gql = `
    mutation SendNewMessage($userId: ID!, $connectionId: ID!, $subject: String!, $body: String!) {
      user(id: $userId) {
        conversation: sendEmail(to: $connectionId, subject: $subject, body: $body) {
          id
        }
      }
    }
  `

  const variables = {
    userId: session.userId,
    connectionId: 'person1',
    subject: body.subject,
    body: body.body
  }

  return {
    gql,
    variables,
    respond: (pageData) => {
      // prevents multiple submissions on refresh
      throw new Redirect({ url: `/messages/${pageData.user.conversation.id}` })
    }
  }
}

const setEmailPreference = ({ body, params, session }) => {
  const gql = `
    mutation SetEmailPreference(
      $userId: ID!,
      $data: PersonUpdateInput!
    ) {
      updatePerson(id: $userId, data: $data) {
        id
        emailPreference
      }
    }
  `

  const variables = {
    userId: session.userId,
    data: {
      emailPreference: body.emailProvider
    }
  }

  // TODO: Dry up with survey-complete/fetchers.js `setEmailPreference`
  const respond = data => {
    session.returnTo = `/messages`
    session.returnFail = `/messages`
    throw new Redirect({
      url: '/auth/google'
    })
  }

  return { gql, variables, respond }
}

module.exports = {
  getMessages,
  getThread,
  getActiveJobs,
  getMessageTemplate,
  replyTo,
  sendNewMessage,
  setEmailPreference
}
