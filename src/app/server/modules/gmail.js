const get = require('lodash/get')
const google = require('../lib/google')
const logger = require('../../lib/logger')
const templater = require('../../lib/templater')
const conversations = require('./conversations')
const accounts = require('./accounts')
const { getDataBuilderFor } = require('../../lib/tags')
const { Unauthorized } = require('@nudj/framework/errors')

const getAccountForPerson = (person) => {
  return accounts.getByFilters({ person })
    .then(account => {
      if (!account || !get(account, 'providers.google.accessToken')) {
        throw new Unauthorized({ type: 'Google' })
      }
      return Promise.resolve(account.providers.google)
    })
}

const refreshAccessTokenAndSend = (email, refreshToken) => {
  return google.getAccessTokenFromRefreshToken(refreshToken)
    .then(accessToken => sendGmailAndLogResponse(email, accessToken, refreshToken))
    .catch(() => {
      throw new Unauthorized({ type: 'Google' })
    })
}

const sendGmailAndLogResponse = (email, accessToken, refreshToken) => {
  return google.sendGmail(email, accessToken)
    .then(response => {
      logger.log('email response', response, email)
      const conversation = {
        threadId: response.threadId
      }
      return conversation
    })
    .catch(error => {
      logger.log('error', 'Error sending Gmail', error)
      return refreshAccessTokenAndSend(email, refreshToken)
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

  return getAccountForPerson(person)
    .then(account => sendGmailAndLogResponse(email, account.accessToken, account.refreshToken))
    .then(conversation => saveConversationAndMarkAsSent(data, conversation))
}

module.exports = { send }
