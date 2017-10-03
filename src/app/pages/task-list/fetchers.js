const { promiseMap } = require('@nudj/library')
const logger = require('@nudj/framework/logger')

const common = require('../../server/modules/common')
const tasks = require('../../server/modules/tasks')
const hirers = require('../../server/modules/hirers')

const accessToken = process.env.PRISMICIO_ACCESS_TOKEN
const repo = process.env.PRISMICIO_REPO
const prismic = require('../../server/modules/prismic')({accessToken, repo})
const prismicQuery = {
  'document.type': 'tooltip',
  'document.tags': ['taskList']
}

const get = ({
  data,
  req
}) => tasks.getAllByHirerAndCompany(data, data.hirer.id, data.company.id)
.then(data => hirers.getAllByCompany(data, data.company.id))
.then(data => {
  data.people = common.fetchPeopleFromFragments(data.hirers)
  return promiseMap(data)
})
.then(data => {
  data.tooltip = prismic.fetchContent(prismicQuery, true)
  return promiseMap(data)
})

module.exports = {
  get
}
