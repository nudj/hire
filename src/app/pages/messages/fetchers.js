const get = require('lodash/get')
const { cookies } = require('@nudj/library')
const { Redirect } = require('@nudj/library/errors')

const { createNotification } = require('../../lib')
const { Global } = require('../../lib/graphql')
const { emailPreferences } = require('../../lib/constants')

const getMessages = ({ session }) => {
  const gql = `
    query GetMessages ($userId: ID!) {
      user {
        emailPreference
        conversations {
          id
          type
          subject
          recipient {
            id
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
      user {
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
                email
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
    const newlyOnboarded = cookies.get(req, 'newlyOnboarded')
    cookies.set(res, 'newlyOnboarded', false)

    return {
      ...data,
      newlyOnboarded: newlyOnboarded === 'true'
    }
  }

  return { gql, variables, transformData }
}

const trackSentMessageEvent = (analytics, properties = {}) => {
  analytics.track({
    object: analytics.objects.message,
    action: analytics.actions.message.sent,
    properties
  })
}

const replyTo = props => {
  const { session, params, body, analytics } = props

  // TODO: API side validation
  if (body.body.length > 0) {
    const gql = `
      mutation ReplyTo (
        $userId: ID!,
        $conversationId: ID!,
        $body: String!
      ) {
        user {
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
              id
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
      respond: data => {
        trackSentMessageEvent(analytics, {
          conversation: params.conversationId,
          from: session.userId,
          to: get(data, 'user.conversation.recipient.id')
        })
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

const hasActiveJobs = (data) => {
  const jobs = get(data, 'user.hirer.company.jobs', [])

  if (jobs.length) return data

  throw new Redirect({
    url: '/contacts',
    notification: createNotification(
      'info',
      'To message someone, please publish a job'
    )
  })
}

const getActiveJobs = props => {
  const { session, params } = props
  const gql = `
    query GetJobs(
      $userId: ID!,
      $recipientId: ID!,
      $status: JobStatus
    ) {
      user {
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

  return {
    gql,
    variables,
    transformData: hasActiveJobs
  }
}

const getMessageTemplate = props => {
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
      user {
        firstName
        emailPreference
        hirer {
          company {
            slug
            job: jobByFilters(filters: {id: $jobId}) {
              referral: createReferralWithParentForPerson(
                person: $recipientId,
                parentPerson: $userId
              ) {
                id
              }
              slug
              title
              url
              template
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

const sendNewMessage = ({ session, params, body, req, analytics }) => {
  const gql = `
    mutation SendNewMessage($recipientId: ID!, $subject: String!, $body: String!) {
      user {
        conversation: sendEmail(to: $recipientId, subject: $subject, body: $body) {
          id
        }
      }
      ${Global}
    }
  `

  const variables = {
    recipientId: params.recipientId,
    subject: body.subject,
    body: body.body
  }

  return {
    gql,
    variables,
    respond: (pageData) => {
      const newlyOnboarded = cookies.get(req, 'newlyOnboarded')

      trackSentMessageEvent(analytics, {
        conversation: pageData.user.conversation.id,
        from: session.userId,
        to: params.recipientId
      })

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
