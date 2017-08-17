const mapValues = require('lodash/mapValues')
const NudjError = require('../../lib/error')
const request = require('../../lib/request')
const mailer = require('../lib/mailer')
const templater = require('../../lib/templater')
const { promiseMap } = require('../lib')
const { merge } = require('../../lib')
const logger = require('../../lib/logger')
const { emails: validators } = require('../../lib/validators')
const { getDataBuilderFor } = require('../../lib/tags')

function validate (formData, data, tags) {
  let invalid
  formData = mapValues(formData, (value, key) => {
    const error = validators[key](value, { permittedTags: Object.keys(tags) })
    if (error) {
      invalid = true
    }
    return {
      value,
      error
    }
  })
  if (invalid) {
    throw new NudjError(`Invalid form data`, 'invalid-form', formData)
  }
  data.form = formData
  return data
}

function sendEmails ({ recipients, subject, template }, tags) {
  return (data) => {
    try {
      data = validate({ recipients, subject, template }, data, tags)
      const html = renderMessage({ data, template, tags }).join('')
      const fromLabel = `${data.person.firstName} ${data.person.lastName}`
      data.messages = Promise.all(recipients.replace(' ', '').split(',').map(sendEmail({ fromLabel, subject, html })))
    } catch (error) {
      if (error.name !== 'NudjError') {
        return Promise.reject(error)
      }
      data = handleError(error, data)
    }
    return promiseMap(data)
  }
}

function handleError (error, data) {
  delete data.messages
  data.form = error.data
  data.notification = {
    type: 'error',
    message: error.message
  }
  return data
}

function renderMessage ({ data, template, tags }) {
  return templater.render({
    template,
    data: getDataBuilderFor(tags, data),
    pify: (contents, index, margin = 0) => `<p style="margin-top:${1.5 * margin}rem;">${contents.join('')}</p>`
  })
}

function sendEmail ({ fromLabel, subject, html }) {
  return (to) => mailer.send({
    from: `${fromLabel} <hello@nudj.co>`,
    to,
    subject,
    html
  })
}

module.exports.send = function (data, instructions, tags) {
  return sendEmails(instructions, tags)(data)
  .catch((error) => {
    logger.log('error', error)
    return merge(data, {
      messages: null,
      form: mapValues(instructions, (value) => ({ value })),
      notification: {
        type: 'error',
        message: 'There was a problem sending your email, please try again'
      }
    })
  })
}

const common = require('./common')

function fetchNetworkForJob (data, hirer, job) {
  data.network = request(`recommendations/filter?hirer=${hirer}&job=${job}&source=HIRER`)
    .then(common.fetchPeopleFromFragments)

  data.nudjNetwork = request(`recommendations/filter?hirer=${hirer}&job=${job}&source=NUDJ`)
    .then(common.fetchPeopleFromFragments)

  return promiseMap(data)
}

function fetchNetworkForJobAndPerson (data, hirer, job, person) {
  data.recommendation = request(`recommendations/filter?hirer=${hirer}&job=${job}&person=${person}&source=HIRER`)
    .then(common.fetchPeopleFromFragments)

  return promiseMap(data)
}

function fetchNetwork (data, hirer, job) {
  data.network = request(`recommendations/filter?hirer=${hirer}`)
    .then(common.fetchPeopleFromFragments)
  return promiseMap(data)
}

module.exports.get = function (data, hirer, job) {
  return fetchNetworkForJob(data, hirer, job)
}

module.exports.getById = function (data, hirer, job, person) {
  return fetchNetworkForJobAndPerson(data, hirer, job, person)
}

module.exports.getAll = function (data, hirer) {
  return fetchNetwork(data, hirer)
}

module.exports.getRecipient = function (data, person) {
  data.recipient = request(`people/${person}`)
  return promiseMap(data)
}
