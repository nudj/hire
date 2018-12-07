const { Redirect } = require('@nudj/library/errors')

const { Global } = require('../../lib/graphql')

const post = ({ body, session }) => {
  const {
    _redirectTo,
    ...userUpdate
  } = body

  const gql = `
    mutation updateUser ($userId: ID!, $userUpdate: PersonUpdateInput!) {
      updatePerson(id: $userId, data: $userUpdate) {
        emailPreference
      }
      ${Global}
    }
  `

  const variables = {
    userId: session.userId,
    userUpdate
  }

  const respond = data => {
    if (userUpdate.emailPreference) {
      session.returnTo = _redirectTo
      session.returnFail = _redirectTo
      throw new Redirect({
        url: '/auth/google'
      })
    } else {
      throw new Redirect({
        url: _redirectTo,
        notification: {
          type: 'info',
          message: `Your settings have been updated`
        }
      })
    }
  }

  const catcher = (e) => {
    throw new Redirect({
      url: _redirectTo,
      notification: {
        type: 'error',
        message: 'Something went wrong while updating your settings. Please try again.'
      }
    })
  }

  return { gql, variables, respond, catcher }
}

module.exports = {
  post
}
