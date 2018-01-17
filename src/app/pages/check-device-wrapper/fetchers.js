const { Redirect } = require('@nudj/framework/errors')

const { createNotification } = require('../../lib')
const mailer = require('../../lib/mailer')
const template = require('./email-template')

const sendMagicLink = ({ session }) => {
  const gql = `
    query getUser($userId: ID!, $subject: String!, $body: String!) {
      user (id: $userId) {
        notifyByEmail(subject: $subject, body: $body) {
          success
        }
      }
    }
  `

  const variables = {
    userId: session.userId,
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
