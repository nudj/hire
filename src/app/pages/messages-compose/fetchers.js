const { cookies } = require('@nudj/library')
const { Redirect } = require('@nudj/library/errors')

const { createNotification } = require('../../lib')
const { Global } = require('../../lib/graphql')

const get = props => {
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
              id
              slug
              title
              url
            }
          }
        }
      }
      recipient: person(id: $recipientId) {
        id
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

const trackSentMessageEvent = (analytics, properties = {}) => {
  analytics.track({
    object: analytics.objects.message,
    action: analytics.actions.message.sent,
    properties
  })
}

const post = ({ session, params, body, req, analytics }) => {
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

module.exports = {
  get,
  post
}
