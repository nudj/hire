const {
  merge,
  promiseMap,
  addDataKeyValue
} = require('@nudj/library')
const {
  AppError,
  Redirect
} = require('@nudj/framework/errors')

const accounts = require('../../server/modules/accounts')
const jobs = require('../../server/modules/jobs')
const people = require('../../server/modules/people')
const employees = require('../../server/modules/employees')
const network = require('../../server/modules/network')
const gmail = require('../../server/modules/gmail')
const tasks = require('../../server/modules/tasks')
const internalMessages = require('../../server/modules/internal-messages')
const externalMessages = require('../../server/modules/external-messages')
const prismic = require('../../server/lib/prismic')
const tags = require('../../lib/tags')

const tooltipOptions = {
  type: 'tooltip',
  tags: ['selectReferrers', 'external'],
  keys: {
    title: 'tooltiptitle',
    text: 'tooltiptext',
    intercom: 'tooltipintercombutton'
  }
}

const get = ({
  data,
  params
}) => {
  return addDataKeyValue('tasksIncomplete', data => tasks.getIncompleteByHirerAndCompanyExposed(data.hirer.id, data.company.id))(data)
    .then(data => jobs.get(data, params.jobSlug))
    .then(data => network.get(data, data.hirer.id, data.job.id))
    .then(data => externalMessages.getAll(data, data.hirer.id, data.job.id))
    .then(data => externalMessages.getAllComplete(data, data.hirer.id, data.job.id))
    .then(data => externalMessages.getAllIncomplete(data, data.hirer.id, data.job.id))
    .then(data => {
      const referrerType = data.externalMessages.length ? 'notFirstTime' : 'firstTime'
      const referrerTooltipOptions = merge(tooltipOptions, {
        tags: tooltipOptions.tags.concat(referrerType)
      })
      data.tooltips = prismic.fetchContent(referrerTooltipOptions)
      data.networkSaved = data.externalMessages.map(person => person.id)
      data.networkSent = data.externalMessagesComplete.map(person => person.id)
      return promiseMap(data)
    })
}

const post = ({
  data,
  params,
  body
}) => {
  const recipient = body.recipient

  return addDataKeyValue('tasksIncomplete', data => tasks.getIncompleteByHirerAndCompanyExposed(data.hirer.id, data.company.id))(data)
    .then(data => jobs.get(data, params.jobSlug))
    .then(data => network.getRecipient(data, recipient))
    .then(data => externalMessages.post(data, data.hirer, data.job, recipient))
    .then(data => {
      if (!data.externalMessage) {
        throw new AppError('Message not saved', {
          From: `${data.person.firstName} ${data.person.lastName}`,
          To: recipient,
          Job: data.job.title
        })
      }
      throw new Redirect({
        url: `/jobs/${data.job.slug}/external/${data.externalMessage.id}`
      })
    })
}

module.exports = {
  get,
  post
}
