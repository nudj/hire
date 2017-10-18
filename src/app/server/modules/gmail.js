const get = require('lodash/get')
const find = require('lodash/find')
const parser = require('node-email-reply-parser')
const { Base64 } = require('js-base64')
const logger = require('@nudj/framework/logger')
const { Unauthorized } = require('@nudj/framework/errors')
const { promiseMap } = require('@nudj/library')

const google = require('../lib/google')
const templater = require('../../lib/templater')
const accounts = require('./accounts')
const { getDataBuilderFor } = require('../../lib/tags')

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

const formatThreadMessages = (messages) => {
  return messages.map(messageData => {
    let encryptedBody = get(messageData.payload, 'body.data')

    if (!encryptedBody) {
      const parts = messageData.payload.parts
      encryptedBody = get(parts.shift(), 'body.data')
    }

    const headers = messageData.payload.headers
    const decodedMessage = Base64.decode(encryptedBody)
    const sender = get(find(headers, { name: 'From' }), 'value')
    const date = get(find(headers, { name: 'Date' }), 'value')
    const message = parser(decodedMessage).getVisibleText()
    return {
      sender,
      date,
      message
    }
  })
}

const fetchMessagesByThread = (threadId, person) => {
  return getAccountForPerson(person)
    .then(account => google.getThread(threadId, account.accessToken))
    .then(response => formatThreadMessages(response.messages))
}

const getThreadMessages = (data, threadId, person) => {
  data.conversationMessages = fetchMessagesByThread(threadId, person)
  return promiseMap(data)
}

const sendGmailAndLogResponse = (email, accessToken, refreshToken) => {
  return google.sendGmail(email, accessToken)
    .then(response => {
      logger.log('email response', response, email)
      return response.threadId
    })
    .catch(error => {
      logger.log('error', 'Error sending Gmail', error)
      return refreshAccessTokenAndSend(email, refreshToken)
    })
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
}

module.exports = {
  send,
  getThreadMessages
}
