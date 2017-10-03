const {
  promiseMap,
  addDataKeyValue,
  merge
} = require('@nudj/library')
const logger = require('@nudj/framework/logger')

const jobs = require('../../server/modules/jobs')
const externalMessages = require('../../server/modules/external-messages')
const internalMessages = require('../../server/modules/internal-messages')

const accessToken = process.env.PRISMICIO_ACCESS_TOKEN
const repo = process.env.PRISMICIO_REPO
const prismic = require('../../server/modules/prismic')({accessToken, repo})
const prismicQuery = {
  'document.type': 'tooltip',
  'document.tags': ['jobsDashboard']
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
}) => jobs.getAll(data)
.then(jobsHaveSent)
.then(addDataKeyValue('tooltip', () => prismic.fetchContent(prismicQuery, true)))

module.exports = {
  get
}
