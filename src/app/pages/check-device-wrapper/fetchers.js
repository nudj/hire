const { Redirect } = require('@nudj/framework/errors')

const { createNotification } = require('../../lib')
const mailer = require('../../lib/mailer')

const sendMagicLink = ({ session }) => {
  const gql = `
    query getUser($userId: ID!) {
      user (id: $userId) {
        email
      }
    }
  `

  const variables = {
    userId: session.userId
  }

  const respond = async data => {
    console.log('DATA', data)
    const mailResponse = await mailer.send({
      to: process.env.USE_MOCKS ? 'rich@nudj.co' : data.user.email,
      from: 'hello@nudj.co',
      subject: 'Continue with your nudj onboarding',
      html: '<a href="http://localhost:90/login">Continue onboarding</a>'
    })

    console.log('MAIL RESPONSE', mailResponse)

    throw new Redirect({
      url: `/welcome`,
      notification: createNotification(
        'success',
        'Check your inbox to continue on your other device'
      )
    })
  }

  return { gql, variables, respond }
}

module.exports = { sendMagicLink }
