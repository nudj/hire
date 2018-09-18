const get = require('lodash/get')
const find = require('lodash/find')
const { Redirect } = require('@nudj/framework/errors')
const logger = require('@nudj/framework/logger')

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

const uploadConnections = ({ body, files, analytics }) => {
  const gql = `
    mutation ImportPage ($connections: [Data!]!) {
      user {
        firstName
        lastName
        email
        importedConnections: importLinkedinConnections (connections: $connections) {
          created
          collection
        }
        hirer {
          company {
            name
            survey: surveyOrDefault {
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
    respond: data => {
      try {
        const companiesUploaded = find(data.user.importedConnections, {
          collection: 'companies'
        })
        sendImportEmail({
          name: `${get(data, 'user.firstName', '')} ${get(
            data,
            'user.lastName',
            ''
          )}`,
          company: get(data, 'user.hirer.company.name', ''),
          data: {
            newCompanyCount: companiesUploaded && companiesUploaded.created
          }
        })
        intercom.logEvent({
          event_name: 'linkedin network uploaded',
          email: data.user.email,
          metadata: {
            category: 'onboarding'
          }
        })
        intercom.updateUser({
          email: data.user.email,
          custom_attributes: {
            connections: body.connections.length
          }
        })
      } catch (error) {
        logger.log('error', 'Intercom Error', error)
      }

      analytics.track({
        object: analytics.objects.connections,
        action: analytics.actions.connections.uploaded,
        properties: {
          connectionsCount: body.connections.length
        }
      })

      const message = `You just added ${body.connections.length} connections 🙌`

      throw new Redirect({
        url: `/surveys/${get(data, 'user.hirer.company.survey.slug', '')}`,
        notification: createNotification('success', message)
      })
    }
  }
}

function sendImportEmail ({ name, company, location, data }) {
  const subject = `${name} @ ${company} has uploaded their connections`
  const from = 'hello@nudj.co'
  const to = process.env.NUDJ_INTERNAL_NOTIFICATION_EMAIL

  let html = 'Go check them out!'
  if (data.newCompanyCount) {
    html = `${html} ${data.newCompanyCount} new companies are ready to be enriched!`
  }

  return mailer.send({ from, to, subject, html })
}

module.exports = {
  fetchPageData,
  uploadConnections
}
