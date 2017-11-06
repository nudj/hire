const { merge } = require('@nudj/library')
const request = require('../../lib/request')
const { GlobalFragment } = require('../../lib/graphql')

const get = async ({
  data
}) => {
  const query = `
    query PageData ($userEmail: String) {
      person: personByFilters (filters: {
        email: $userEmail
      }) {
        ...Global
        id
        connections {
          id
          to {
            id
            firstName
            lastName
            title
            company
          }
        }
      }
    }
    ${GlobalFragment}
  `
  const variables = {
    userEmail: data.user.email
  }
  const responseData = await request('/', {
    baseURL: `http://${process.env.API_HOST}:82`,
    method: 'post',
    data: {
      query,
      variables
    }
  })
  return merge(data, responseData.data)
}

module.exports = {
  get
}
