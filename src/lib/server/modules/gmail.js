const get = require('lodash/get')
const gmailer = require('../lib/gmailer')
const logger = require('../../lib/logger')
const templater = require('../../lib/templater')
const conversations = require('./conversations')
const accounts = require('./accounts')
const { getDataBuilderFor } = require('../../lib/tags')

const getAccessTokenForPerson = (person) => {
  return accounts.getByFilters({ person })
    .then(account => {
      if (!account || !get(account, 'providers.google.accessToken')) {
        throw new Error('Unauthorized Google')
      }
      return Promise.resolve(account.providers.google)
    })
}

const refreshAccessTokenAndSend = (person, email) => {
  return accounts.refreshGoogleAccessToken(person)
    .then(account => {
      const accessToken = get(account, 'providers.google.accessToken')
      return sendGmailAndLogResponse(email, accessToken, person)
    })
    .catch(error => {
      logger.log('error', error)
      throw new Error('Unauthorized Google')
    })
}

const sendGmailAndLogResponse = (email, accessToken, person) => {
  return gmailer.send(email, accessToken)
    .then(response => {
      logger.log('email response', response, email)
      const conversation = {
        threadId: response.threadId
      }
      return conversation
    })
    .catch(error => {
      logger.log('error', 'Error sending Gmail', error)
      return refreshAccessTokenAndSend(person, email)
    })
}

const saveConversationAndMarkAsSent = (data, conversation) => {
  return conversations.post(data, data.person.id, data.recipient.id, conversation, 'GMAIL')
}

const send = (data, person, tags) => {
  const senderFirstName = get(data, 'person.firstName', 'FIRST_NAME')
  const senderLastName = get(data, 'person.lastName', 'SECOND_NAME')

  const message = templater.render(
    {
      data: getDataBuilderFor(tags, data),
      template: get(data, 'externalMessage.composeMessage', get(data, 'template')),
      pify: (contents) => `<p>${contents.join('')}</p>`
    }
  ).join('\n\n')

  const email = {
    body: message,
    from: `${senderFirstName} ${senderLastName} <${get(data, 'person.email', '')}>`,
    subject: get(data, 'subject', 'Can you help me out?'),
    to: get(data, 'recipient.email')
  }

  return getAccessTokenForPerson(person)
    .then(account => sendGmailAndLogResponse(email, account.accessToken, person))
    .then(conversation => saveConversationAndMarkAsSent(data, conversation))
}

module.exports = { send }
