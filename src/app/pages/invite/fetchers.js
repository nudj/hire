const { Redirect } = require('@nudj/library/errors')
const { Global } = require('../../lib/graphql')

const get = () => {
  const gql = `
    query {
      user {
        hirer {
          company {
            id
          }
        }
      }
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
      notification: setNotification (type: "success", message: "Invitations sent! 🎉") {
        type
        message
      }
      ${Global}
    }
  `
  const variables = {
    emailAddresses
  }
  const catcher = () => {
    throw new Redirect({
      url: '/invite',
      notification: {
        type: 'error',
        message: 'Something went wrong while sending your invitations! Please try again.'
      }
    })
  }

  return { gql, variables, catcher }
}

module.exports = {
  get,
  post
}
