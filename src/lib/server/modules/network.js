const get = require('lodash/get')
const isEmail = require('validator/lib/isEmail')
const NudjError = require('../../lib/error')
const request = require('../../lib/request')
const mailer = require('../lib/mailer')
const templater = require('../../lib/templater')
const { promiseMap } = require('../lib')
const { merge } = require('../../lib')

function fetchJob (data, jobSlug) {
  data.job = request(`jobs/${jobSlug}`)
  return promiseMap(data)
}

function sendEmails ({ recipients, subject, template }) {
  return (data) => {
    try {
      data.form = { recipients, subject, template }
      recipients = recipients.replace(' ', '').split(',').reduce((emails, email) => {
        if (isEmail(email)) {
          emails.push(email)
        } else {
          throw new NudjError(`Invalid email - ${email}`, 'invalid-email', email)
        }
        return emails
      }, [])
      let html = renderMessage({ data, template })
      data.messages = Promise.all(recipients.map(sendEmail({ subject, html })))
    } catch (error) {
      data = handleError(error, data)
    }
    return promiseMap(data)
  }
}

function handleError (error, data) {
  delete data.messages
  data.error = merge(error, {
    code: 500
  })
  return data
}

function renderMessage ({ data, template }) {
  return templater.render({
    template,
    data: {
      job: {
        title: get(data, 'job.title'),
        bonus: get(data, 'job.bonus')
      },
      companyName: get(data, 'company.name'),
      link: 'https://nudj.co/company/job',
      personName: `${get(data, 'person.firstName')} ${get(data, 'person.lastName')}`
    }
  })
}

function sendEmail ({ subject, html }) {
  return (to) => mailer.send({
    from: 'nick@nudj.co',
    to,
    subject,
    html
  })
}

module.exports.send = function (data, jobSlug, instructions) {
  return fetchJob(data, jobSlug)
  .then(sendEmails(instructions))
}

const common = require('./common')

function fetchNetworkForJob (data, hirerId, jobId) {
  data.network = request(`recommendations/?hirerId=${hirerId}&jobId=${jobId}&source=hirer`)
    .then(common.fetchPeopleFromFragments)

  data.nudjNetwork = request(`recommendations/?hirerId=${hirerId}&jobId=${jobId}&source=nudj`)
    .then(common.fetchPeopleFromFragments)

  data.sentExternal = request(`sentExternal/?hirerId=${hirerId}&jobId=${jobId}`)
    .then(common.fetchPeopleFromFragments)

  return promiseMap(data)
}

function fetchNetworkForJobAndPerson (data, hirerId, jobId, personId) {
  data.recommendation = request(`recommendations/?hirerId=${hirerId}&jobId=${jobId}&personId=${personId}&source=hirer`)
    .then(common.fetchPeopleFromFragments)

  return promiseMap(data)
}

function fetchNetwork (data, hirerId, jobId) {
  data.network = request(`recommendations/?hirerId=${hirerId}`)
    .then(common.fetchPeopleFromFragments)
  return promiseMap(data)
}

module.exports.get = function (data, hirerId, jobId) {
  return fetchNetworkForJob(data, hirerId, jobId)
}

module.exports.getById = function (data, hirerId, jobId, personId) {
  return fetchNetworkForJobAndPerson(data, hirerId, jobId, personId)
}

module.exports.getAll = function (data, hirerId) {
  return fetchNetwork(data, hirerId)
}
