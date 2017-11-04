const { merge, addDataKeyValue } = require('@nudj/library')
const request = require('../../lib/request')
const prismic = require('../../server/lib/prismic')

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
    query tasksPage ($personId: ID) {
      person (id: $personId) {
        id
        firstName
        lastName
        incompleteTaskCount
        tasks {
          id
          modified
          type
          completed
        }
        company: hirerForCompany {
          id
          name
          slug
          onboarded
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
