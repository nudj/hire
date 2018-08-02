const { Redirect } = require('@nudj/framework/errors')

const { createNotification } = require('../../lib')
const template = require('./email-template')
const { Global } = require('../../lib/graphql')

const sendMagicLink = () => {
  const gql = `
    query getUser($subject: String!, $body: String!) {
      user {
        notifyByEmail(subject: $subject, body: $body) {
          success
        }
      }
      ${Global}
    }
  `

  const variables = {
    subject: 'Continue setting up your nudj account',
    body: template
  }

  const respond = async data => {
    if (data.user.notifyByEmail.success) {
      throw new Redirect({
        url: `/notification-sent`,
        notification: null
      })
    } else {
      throw new Redirect({
        url: `/welcome`,
        notification: createNotification(
          'error',
          'Unable to send email'
        )
      })
    }
  }

  return { gql, variables, respond }
}

module.exports = { sendMagicLink }
