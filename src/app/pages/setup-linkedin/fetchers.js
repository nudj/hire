const { Redirect } = require('@nudj/framework/errors')
const get = require('lodash/get')

const { Global } = require('../../lib/graphql')
const { createNotification } = require('../../lib')
const intercom = require('../../lib/intercom')
const mailer = require('../../lib/mailer')

const fetchPageData = ({ session }) => {
  const gql = `
    query ImportPage {
      user {
        hirer {
          id
        }
      }
      ${Global}
    }
  `
  return { gql }
}

const uploadConnections = ({ body, files }) => {
  const gql = `
    mutation ImportPage ($connections: [Data!]!) {
      user {
        firstName
        lastName
        email
        importedConnections: importLinkedinConnections (connections: $connections) {
          created
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
    connections: body.connections
  }

  return {
    gql,
    variables,
    respond: async data => {
      if (process.env.USE_MOCKS !== 'true') {
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
      }

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
