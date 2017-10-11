const {
  merge,
  promiseMap,
  addDataKeyValue
} = require('@nudj/library')
const { Redirect } = require('@nudj/framework/errors')
const isEqual = require('lodash/isEqual')
const _get = require('lodash/get')

const accounts = require('../../server/modules/accounts')
const jobs = require('../../server/modules/jobs')
const people = require('../../server/modules/people')
const employees = require('../../server/modules/employees')
const network = require('../../server/modules/network')
const gmail = require('../../server/modules/gmail')
const tasks = require('../../server/modules/tasks')
const internalMessages = require('../../server/modules/internal-messages')
const surveys = require('../../server/modules/surveys')
const surveyMessages = require('../../server/modules/survey-messages')
const employeeSurveys = require('../../server/modules/employee-surveys')
const tokens = require('../../server/modules/tokens')
const assets = require('../../server/modules/assets')
const prismic = require('../../server/lib/prismic')
const { createNotification } = require('../../lib')
const tags = require('../../lib/tags')
const intercom = require('../../lib/intercom')
const mailer = require('../../server/lib/mailer')
const {surveyTypes} = require('../../lib/constants')

const tooltipOptions = {
  type: 'tooltip',
  tags: ['importContacts', 'linkedIn'],
  keys: {
    title: 'tooltiptitle',
    text: 'tooltiptext',
    intercom: 'tooltipintercombutton'
  }
}

const get = ({
  data
}) => {
  return addDataKeyValue('tasksIncomplete', data => tasks.getIncompleteByHirerAndCompanyExposed(data.hirer.id, data.company.id))(data)
  .then(data => {
    data.tooltip = prismic.fetchContent(tooltipOptions).then(results => results && results[0])
    return promiseMap(data)
  })
}

function sendImportEmail (data) {
  const name = `${_get(data, 'person.firstName', '')} ${_get(data, 'person.lastName', '')}`
  const company = _get(data, 'company.name', '')
  const location = _get(data, 'asset.location', '')

  const subject = `${name} @ ${company} has uploaded their connections`
  const html = `You can download it from ${location}`
  const from = 'hello@nudj.co'
  const to = process.env.NUDJ_INTERNAL_NOTIFICATION_EMAIL

  mailer.send({from, to, subject, html})

  return promiseMap(data)
}

const post = ({
  data,
  body,
  req
}) => {
  const assetType = 'CONTACTS_LINKEDIN'
  const person = data.person.id
  const asset = req.files.file.data
  const fileName = body.name
  const taskType = 'UNLOCK_NETWORK_LINKEDIN'
  const eventName = 'linkedin network uploaded'

  return addDataKeyValue('tasksIncomplete', data => tasks.getIncompleteByHirerAndCompanyExposed(data.hirer.id, data.company.id))(data)
    .then(data => assets.post({data, asset, assetType, fileName, person}))
    .then(data => sendImportEmail(data))
    .then(data => tasks.completeTaskByType(data, data.company.id, data.hirer.id, taskType))
    .then(data => {
      return intercom.logEvent({
        event_name: eventName,
        email: data.person.email,
        metadata: {
          category: 'onboarding'
        }
      })
      .then(() => {
        throw new Redirect({
          url: '/',
          notification: createNotification('success', 'Nice. We\'ll let you know as soon as we find someone worth asking.')
        })
      })
    })
}

module.exports = {
  get,
  post
}
