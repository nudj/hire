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
      company {
        name
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
  return merge(data, responseData.data.person.hirer, { tooltip })
}

module.exports = {
  get
}
