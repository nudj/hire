const {
  promiseMap,
  addDataKeyValue,
  merge
} = require('@nudj/library')
const logger = require('@nudj/framework/logger')

const jobs = require('../../server/modules/jobs')
const tasks = require('../../server/modules/tasks')
const externalMessages = require('../../server/modules/external-messages')
const internalMessages = require('../../server/modules/internal-messages')
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

function jobsHaveSent (data) {
  data.jobs = Promise.all(data.jobs.map(job => jobHasSent(merge({}, job), data.hirer.id, job.id)))
  return promiseMap(data)
}

function jobHasSent (data, hirer, jobId) {
  return Promise.all([
    externalMessages.getAll({}, hirer, jobId),
    internalMessages.getAll({}, hirer, jobId)
  ])
  .then(sentResults => {
    const externalMessages = sentResults[0].externalMessages
    const internalMessages = sentResults[1].internalMessages
    return Boolean(externalMessages.length || internalMessages.length)
  })
  .then(hasSent => merge(data, {hasSent}))
}

const get = ({
  data,
  req
}) => addDataKeyValue('tasksIncomplete', data => tasks.getIncompleteByHirerAndCompanyExposed(data.hirer.id, data.company.id))(data)
.then(data => jobs.getAll(data))
.then(jobsHaveSent)
.then(addDataKeyValue('tooltip', () => prismic.fetchContent(tooltipOptions).then(tooltips => tooltips && tooltips[0])))

module.exports = {
  get
}
