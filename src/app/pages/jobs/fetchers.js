const { merge } = require('@nudj/library')

const request = require('../../lib/request')
const prismic = require('../../server/lib/prismic')

const tooltipOptions = {
  type: 'tooltip',
  tags: ['jobsDashboard'],
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
    query jobsPage ($personId: ID) {
      person (id: $personId) {
        id
        firstName
        lastName
        incompleteTaskCount
        company: hirerForCompany {
          id
          name
          slug
          onboarded
          jobs {
            id
            created
            title
            slug
            location
            bonus
            internalMessages {
              id
            }
            externalMessages {
              id
            }
          }
        }
      }
    }
  `
  const variables = {
    personId: data.person.id
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
