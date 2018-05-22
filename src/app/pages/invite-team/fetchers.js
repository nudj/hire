const get = require('lodash/get')
const { Redirect } = require('@nudj/library/errors')
const { Global } = require('../../lib/graphql')

const getNothing = () => {
  const gql = `
    query {
      ${Global}
    }
  `

  return { gql }
}

const post = ({ res, body }) => {
  const { emailAddresses } = body

  if (emailAddresses && emailAddresses.length) {
    const gql = `
      mutation sendInvitations ($emailAddresses: [String!]!) {
        user {
          hirer {
            setOnboarded
            onboarded
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

    const respond = data => {
      const newlyOnboarded = !get(data, 'user.hirer.onboarded', false) && get(data, 'user.hirer.setOnboarded', false)
      if (newlyOnboarded) res.cookie('newlyOnboarded', true)

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
  get: getNothing,
  post
}
