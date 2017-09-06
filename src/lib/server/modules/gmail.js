const { promiseMap } = require('@nudj/library')
const get = require('lodash/get')
const gmailer = require('../lib/gmailer')
const logger = require('../../lib/logger')
const templater = require('../../lib/templater')

const send = (data, accessToken) => {
  const companySlug = get(data, 'company.slug', '')
  const jobSlug = get(data, 'job.slug', '')
  const referralId = get(data, 'referral.id', '')
  const senderFirstName = get(data, 'person.firstName', '')
  const senderLastName = get(data, 'person.lastName', '')
  const referralLink = `https://${process.env.WEB_HOSTNAME}/jobs/${companySlug}+${jobSlug}+${referralId}`

  const options = {
    template: get(data, 'externalMessage.composeMessage'),
    pify: (para) => `<p>${para.join('')}</p>`,
    data: {
      company: {
        name: get(data, 'company.name', '')
      },
      job: {
        bonus: get(data, 'job.bonus', ''),
        link: referralLink,
        title: get(data, 'job.title', '')
      },
      recipient: {
        firstname: get(data, 'recipient.firstName', ''),
        lastname: get(data, 'recipient.lastName', '')
      },
      sender: {
        firstname: senderFirstName,
        lastname: senderLastName
      }
    }
  }

  const message = templater.render(options).join('\n\n')

  const email = {
    body: message,
    from: `${senderFirstName} ${senderLastName} <${get(data, 'person.email', '')}>`,
    subject: 'Can you help me out?',
    to: get(data, 'recipient.email')
  }

  return gmailer
    .send(email, accessToken)
    .then(response => {
      logger.log('email response', response, email)
      return promiseMap(data)
    })
}

module.exports = { send }
