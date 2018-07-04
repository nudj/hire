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
  const { members } = body
  const gql = `
    mutation sendInvitations ($members: [InviteMemberPersonInput!]!) {
      user {
        hirer {
          company {
            id
            inviteMembers(members: $members) {
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
    members
  }
  const catcher = (e) => {
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
