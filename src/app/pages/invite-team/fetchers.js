const { Redirect } = require('@nudj/library/errors')
const { Global } = require('../../lib/graphql')

const get = () => {
  const gql = `
    query {
      ${Global}
    }
  `

  return { gql }
}

const post = ({ body }) => {
  const { emailAddresses } = body
  const gql = `
    mutation sendInvitations ($emailAddresses: [String!]!) {
      user {
        hirer {
          company {
            inviteMembers(emailAddresses: $emailAddresses) {
              success
            }
          }
        }
      }
      ${Global}
    }
  `
  const variables = {
    emailAddresses
  }
  const respond = () => {
    throw new Redirect({
      url: '/get-started',
      notification: {
        type: 'success',
        message: 'Invitations sent! 🎉'
      }
    })
  }
  const catcher = () => {
    throw new Redirect({
      url: '/invite-team',
      notification: {
        type: 'error',
        message: 'Something went wrong while sending your invitations! Please try again.'
      }
    })
  }

  return { gql, variables, respond, catcher }
}

module.exports = {
  get,
  post
}
