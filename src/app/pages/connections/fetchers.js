const { merge } = require('@nudj/library')
const request = require('../../lib/request')

const get = async ({
  data
}) => {
  const query = `
    query PageData ($userEmail: String) {
      person: personByFilters (filters: {
        email: $userEmail
      }) {
        hirer {
          ...Global
          ...Page
        }
      }
    }
    fragment Global on Hirer {
      person {
        incompleteTaskCount
      }
      company {
        onboarded
      }
    }
    fragment Page on Hirer {
      person {
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
  return merge(data, responseData.data.person.hirer)
}

module.exports = {
  get
}
