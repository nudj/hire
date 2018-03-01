const { Redirect } = require('@nudj/library/errors')

const { createNotification } = require('../../lib')
const { Global } = require('../../lib/graphql')
const { emailPreferences } = require('../../lib/constants')

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
            email
            firstName
            lastName
            asAConnection: asAConnectionByFilters(filters: { from: $userId }) {
              firstName
              lastName
            }
          }
          message: latestMessage {
            body
            from {
              email
            }
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
  const { session, params, req, res } = props

  const gql = `
    query GetThread(
      $userId: ID!,
      $conversationId: ID!,
      $accountType: AccountType!
    ) {
      user(id: $userId) {
        emailPreference
        conversation: conversationByFilters(filters: { id: $conversationId }) {
          subject
          type
          recipient {
            firstName
            lastName
            email
            asAConnection: asAConnectionByFilters(filters: { from: $userId }) {
              firstName
              lastName
            }
          }
          messages {
            id
            body
            date
            from {
              firstName
              lastName
              email
              asAConnection: asAConnectionByFilters(filters: { from: $userId }) {
                firstName
                lastName
              }
              account: accountByFilters(filters: { type: $accountType }) {
                emailAddress
              }
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
    accountType: emailPreferences.GOOGLE
  }

  const transformData = data => {
    const { newlyOnboarded } = req.cookies
    res.cookie('newlyOnboarded', false)

    return {
      ...data,
      newlyOnboarded: newlyOnboarded === 'true'
    }
  }

  return { gql, variables, transformData }
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
                asAConnection: asAConnectionByFilters(filters: { from: $userId }) {
                  firstName
                  lastName
                }
              }
            }
            subject
            type
            recipient {
              firstName
              lastName
              email
              asAConnection: asAConnectionByFilters(filters: { from: $userId }) {
                firstName
                lastName
              }
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
    query GetJobs($userId: ID!, $recipientId: ID!, $status: JobStatus) {
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
      }
      recipient: person(id: $recipientId) {
        firstName
        lastName
        asAConnection: asAConnectionByFilters(filters: { from: $userId }) {
          firstName
          lastName
        }
      }
      ${Global}
    }
  `

  const variables = {
    userId: session.userId,
    recipientId: params.recipientId,
    status: 'PUBLISHED'
  }

  return { gql, variables }
}

const getMessageTemplate = (props) => {
  const { session, params } = props

  const gql = `
    query getTemplateAndDetails(
      $userId: ID!,
      $recipientId: ID!,
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
            slug
            job: jobByFilters(filters: {id: $jobId}) {
              referral: createReferral(person: $recipientId) {
                id
              }
              slug
              title
              url
              templateTags
            }
          }
        }
      }
      recipient: person(id: $recipientId) {
        firstName
        lastName
        asAConnection: asAConnectionByFilters(filters: { from: $userId }) {
          firstName
          lastName
        }
        email
      }
      template: fetchTemplate(repo: $repo, type: $templateType, tags: $templateTags)
      ${Global}
    }
  `

  const variables = {
    userId: session.userId,
    recipientId: params.recipientId,
    jobId: params.jobId,
    repo: 'hirer',
    templateType: 'composemessage',
    templateTags: [
      'external',
      'long',
      'familiar',
      'createMessage'
    ]
  }

  return { gql, variables }
}

const sendNewMessage = ({ session, params, body, req }) => {
  const gql = `
    mutation SendNewMessage($userId: ID!, $recipientId: ID!, $subject: String!, $body: String!) {
      user(id: $userId) {
        conversation: sendEmail(to: $recipientId, subject: $subject, body: $body) {
          id
        }
      }
    }
  `

  const variables = {
    userId: session.userId,
    recipientId: params.recipientId,
    subject: body.subject,
    body: body.body
  }

  return {
    gql,
    variables,
    respond: (pageData) => {
      const { newlyOnboarded } = req.cookies

      // prevents multiple submissions on refresh
      throw new Redirect({
        url: `/messages/${pageData.user.conversation.id}`,
        notification: newlyOnboarded !== 'true' ? createNotification(
          'success',
          'Message sent'
        ) : null
      })
    }
  }
}

const redirectToGoogleAuth = ({ session }) => ({
  respond: data => {
    session.returnTo = `/messages`
    session.returnFail = `/messages`
    throw new Redirect({
      url: '/auth/google'
    })
  }
})

module.exports = {
  getMessages,
  getThread,
  getActiveJobs,
  getMessageTemplate,
  replyTo,
  sendNewMessage,
  redirectToGoogleAuth
}
