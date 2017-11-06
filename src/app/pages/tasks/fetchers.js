const { merge } = require('@nudj/library')
const request = require('../../lib/request')
const prismic = require('../../server/lib/prismic')
const { GlobalFragment } = require('../../lib/graphql')

const tooltipOptions = {
  type: 'tooltip',
  tags: ['taskList'],
  keys: {
    title: 'tooltiptitle',
    text: 'tooltiptext',
    intercom: 'tooltipintercombutton'
  }
}

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
        firstName
        tasks {
          id
          modified
          type
          completed
        }
        company: hirerForCompany {
          name
        }
        hirer {
          company {
            tasks {
              id
              modified
              type
              completed
              completedBy {
                id
                firstName
                lastName
              }
            }
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
  const tooltip = await prismic.fetchContent(tooltipOptions).then(tooltips => tooltips && tooltips[0])
  return merge(data, responseData.data, { tooltip })
}

module.exports = {
  get
}
