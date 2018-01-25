const { Redirect } = require('@nudj/framework/errors')
const get = require('lodash/get')

const { Global } = require('../../lib/graphql')
const { createNotification } = require('../../lib')
const intercom = require('../../lib/intercom')
const mailer = require('../../lib/mailer')

const fetchPageData = ({ session }) => {
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

const uploadConnections = ({ session, body, files }) => {
  const userId = session.userId

  const gql = `
    mutation ImportPage (
      $userId: ID!,
      $taskType: TaskType!,
      $connections: [ConnectionCreateInput!]!,
      $source: String!
    ) {
      user (id: $userId) {
        firstName
        lastName
        email
        newConnections: getOrCreateConnections (
          connections: $connections,
          source: $source
        ) {
          id
          firstName
          lastName
          role {
            name
          }
          company {
            name
          }
          source {
            name
          }
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
            surveys {
              slug
            }
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
          name: `${get(data, 'user.firstName', '')} ${get(
            data,
            'user.lastName',
            ''
          )}`,
          company: get(data, 'user.hirer.company.name', '')
        }),
        intercom.logEvent({
          event_name: 'linkedin network uploaded',
          email: data.user.email,
          metadata: {
            category: 'onboarding'
          }
        })
      ])

      const message = `You just added ${body.connections.length} connections 🙌`

      throw new Redirect({
        url: `/surveys/${get(data, 'user.hirer.company.surveys[0].slug', '')}`,
        notification: createNotification('success', message)
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
  fetchPageData,
  uploadConnections
}
