const { Redirect } = require('@nudj/library/errors')
const uniqBy = require('lodash/uniqBy')
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

const post = ({ body, analytics }) => {
  const members = uniqBy(body.members, 'email')

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

  const transformData = data => {
    analytics.track({
      object: analytics.objects.invites,
      action: analytics.actions.invites.sent,
      properties: {
        inviteCount: members.length
      }
    })

    return data
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

  return { gql, variables, catcher, transformData }
}

module.exports = {
  get,
  post
}
