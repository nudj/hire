const _get = require('lodash/get')
const { cookies } = require('@nudj/library')
const { Redirect } = require('@nudj/library/errors')

const { createNotification } = require('../../lib')
const { Global } = require('../../lib/graphql')
const { emailPreferences } = require('../../lib/constants')

const get = props => {
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

const post = props => {
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
          to: _get(data, 'user.conversation.recipient.id')
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

module.exports = {
  get,
  post
}
