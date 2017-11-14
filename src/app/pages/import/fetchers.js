const { Redirect } = require('@nudj/framework/errors')
const _get = require('lodash/get')

const { Global } = require('../../lib/graphql')
const { createNotification } = require('../../lib')
const intercom = require('../../lib/intercom')
const mailer = require('../../server/lib/mailer')

const get = ({ session }) => {
  const gql = `
    query ImportPage ($userId: ID!) {
      user (id: $userId) {
        hirer {
          id
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

const post = async ({ session, body, files }) => {
  const userId = session.userId

  const gql = `
    mutation ImportPage (
      $userId: ID!,
      $taskType: TaskType!,
      $connections: [PersonCreateInput!]!,
      $source: String!
    ) {
      user (id: $userId) {
        firstName
        lastName
        email
        newConnections: getOrCreateConnections (
          to: $connections,
          source: $source
        ) {
          id
          firstName
          lastName
          title
          company
          source
          person {
            id
            email
          }
        }
        completedTask: updateTaskByFilters(
          filters: {
            type: $taskType
          },
          data: {
            completed: true
          }
        ) {
          id
          type
          completed
        }
        hirer {
          company {
            name
          }
        }
      }
      ${Global}
    }
  `
  const variables = {
    userId,
    taskType: 'UNLOCK_NETWORK_LINKEDIN',
    connections: body.connections,
    source: 'linkedin'
  }
  return {
    gql,
    variables,
    respond: async data => {
      await Promise.all([
        sendImportEmail({
          name: `${_get(data, 'user.firstName', '')} ${_get(
            data,
            'user.lastName',
            ''
          )}`,
          company: _get(data, 'user.hirer.company.name', '')
        }),
        intercom.logEvent({
          event_name: 'linkedin network uploaded',
          email: data.user.email,
          metadata: {
            category: 'onboarding'
          }
        })
      ])
      throw new Redirect({
        url: '/connections',
        notification: createNotification(
          'success',
          "Nice. We'll let you know as soon as we find someone worth asking."
        )
      })
    }
  }
}

function sendImportEmail ({ name, company, location }) {
  const subject = `${name} @ ${company} has uploaded their connections`
  const html = 'Go check them out!'
  const from = 'hello@nudj.co'
  const to = process.env.NUDJ_INTERNAL_NOTIFICATION_EMAIL

  return mailer.send({ from, to, subject, html })
}

module.exports = {
  get,
  post
}
