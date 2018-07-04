const { cookies } = require('@nudj/library')
const get = require('lodash/get')
const { Redirect } = require('@nudj/library/errors')
const { Global } = require('../../lib/graphql')

const getMessageTemplate = () => {
  const gql = `
    query {
      messageTemplate: fetchTemplate(repo: "hirer", type: "composemessage", tags: ["invite-onboarding"])
      ${Global}
    }
  `

  return { gql }
}

const post = ({ res, body }) => {
  const { members, inviteTemplate } = body

  if (members && members.length) {
    const gql = `
      mutation sendInvitations (
        $members: [InviteMemberPersonInput!]!,
        $subject: String!,
        $body: String!
      ) {
        user {
          hirer {
            setOnboarded
            onboarded
            company {
              inviteMembersOnboarding(
                members: $members,
                subject: $subject,
                body: $body
              ) {
                success
              }
            }
          }
        }
        ${Global}
      }
    `

    const variables = {
      members,
      subject: inviteTemplate.subject,
      body: inviteTemplate.message
    }

    const respond = data => {
      const newlyOnboarded = !get(data, 'user.hirer.onboarded', false) && get(data, 'user.hirer.setOnboarded', false)
      if (newlyOnboarded) cookies.set(res, 'newlyOnboarded', true)

      throw new Redirect({
        url: '/'
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
  } else {
    const gql = `
      mutation skipInvites {
        user {
          hirer {
            setOnboarded
            onboarded
          }
        }
      }
    `

    const respond = data => {
      throw new Redirect({
        url: '/'
      })
    }

    return {
      gql,
      respond
    }
  }
}

module.exports = {
  get: getMessageTemplate,
  post
}
