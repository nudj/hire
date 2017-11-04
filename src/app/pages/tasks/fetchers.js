const { merge, addDataKeyValue } = require('@nudj/library')
const request = require('../../lib/request')

const common = require('../../server/modules/common')
const tasks = require('../../server/modules/tasks')
const hirers = require('../../server/modules/hirers')
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

const gql = async ({
  data
}) => {
  const query = `
    query tasksPage ($companyId: ID, $personId: ID) {
      company (id: $companyId) {
        id
        name
        slug
        tasks {
          id
          type
          completed
          completedBy {
            id
            firstName
            lastName
          }
        }
        hirer: hirerById (id: $personId) {
          id
          firstName
          lastName
          tasks {
            id
            type
            completed
          }
        }
      }
    }
  `
  const variables = {
    companyId: data.company.id,
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
  return merge(data, responseData.data)
}

const get = ({
  data
}) => addDataKeyValue('tasksIncomplete', data => tasks.getIncompleteByHirerAndCompanyExposed(data.hirer.id, data.company.id))(data)
.then(data => tasks.getAllByHirerAndCompany(data, data.hirer.id, data.company.id))
.then(data => hirers.getAllByCompany(data, data.company.id))
.then(addDataKeyValue('people', data => common.fetchPeopleFromFragments(data.hirers)))
.then(addDataKeyValue('tooltip', () => prismic.fetchContent(tooltipOptions).then(tooltips => tooltips && tooltips[0])))

module.exports = {
  get,
  gql
}
