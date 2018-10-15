const { NotFound } = require('@nudj/framework/errors')
const { Global } = require('../../lib/graphql')

const get = ({ params }) => {
  const gql = `
    query fetchIntro ($introId: ID!) {
      user {
        intro(id: $introId) {
          id
          notes
          job {
            title
          }
          person {
            firstName
            lastName
            email
          }
          candidate {
            firstName
            lastName
            email
          }
        }
      }
      ${Global}
    }
  `

  const variables = {
    introId: params.introId
  }

  const transformData = data => {
    if (!data.user.intro) {
      throw new NotFound()
    }
    return data
  }

  return { gql, transformData, variables }
}

module.exports = { get }
