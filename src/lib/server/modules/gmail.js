const get = require('lodash/get')
const gmailer = require('../lib/gmailer')
const logger = require('../../lib/logger')
const templater = require('../../lib/templater')
const conversations = require('./conversations')
const externalMessages = require('./external-messages')
const accounts = require('./accounts')

const getAccessTokenForPerson = (person) => {
  return accounts.getByFilters({ person })
    .then(account => {
      if (!account || !get(account, 'providers.google.accessToken')) {
        throw new Error('Unauthorized Google')
      }
      return Promise.resolve(account.providers.google)
    })
}

const sendGmailAndLogResponse = (email, accessToken) => {
  return gmailer.send(email, accessToken)
    .then(response => {
      logger.log('email response', response, email)
      const conversation = {
        threadId: response.threadId
      }
      return conversation
    })
}

const saveConversationAndMarkAsSent = (data, conversation) => {
  return conversations.post(data, data.hirer, data.recipient, conversation, 'GMAIL')
    .then(data => externalMessages.patch(data, data.externalMessage.id, {sent: true}))
}

const send = (data, person) => {
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

  return getAccessTokenForPerson(person)
    .then(account => sendGmailAndLogResponse(email, account.accessToken))
    .then(conversation => saveConversationAndMarkAsSent(data, conversation))
}

module.exports = { send }
