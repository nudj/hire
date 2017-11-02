const get = require('lodash/get')
const find = require('lodash/find')
const parser = require('node-email-reply-parser')
const distanceInWordsToNow = require('date-fns/distance_in_words_to_now')
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

const formatThreadMessages = (messages) => {
  return messages.map(messageData => {
    const headers = messageData.payload.headers
    const sender = get(find(headers, { name: 'From' }), 'value')
    const date = `${distanceInWordsToNow(new Date(Number(messageData.internalDate)))} ago`

    let encryptedBody = get(messageData.payload, 'body.data')
    if (!encryptedBody) {
      const parts = messageData.payload.parts
      encryptedBody = get(parts.shift(), 'body.data') // First part always contians message body.
    }

    const decodedMessage = Base64.decode(encryptedBody)
    const message = parser(decodedMessage).getVisibleText()
    const body = message.replace(/(<p>|<\/p>)/g, '') // Remove basic paragraph tags in favour of later template rendering for consistent styling
    return {
      id: messageData.id, // For React component keys
      sender,
      date,
      body
    }
  })
}

const fetchMessagesByThread = (threadId, person) => {
  let refreshToken
  return getAccountForPerson(person)
    .then(account => {
      refreshToken = account.refreshToken
      return google.getThread({ threadId, accessToken: account.accessToken })
    })
    .then(response => formatThreadMessages(response.messages))
    .catch(error => {
      if (error.name !== 'Unauthorized') {
        logger.log('error', 'Error fetching thread', error)
        return refreshAccessTokenAndContinue(refreshToken, google.getThread, { threadId })
        .then(response => formatThreadMessages(response.messages))
      }
      throw new Unauthorized({ type: 'Google' })
    })
}

const getThreadMessages = (data, threadId, person) => {
  data.conversationMessages = fetchMessagesByThread(threadId, person)
  return promiseMap(data)
}

const sendByThread = (email, person, threadId) => {
  let refreshToken

  return getAccountForPerson(person)
    .then(account => {
      refreshToken = account.refreshToken
      return google.sendGmail({ email, accessToken: account.accessToken, threadId })
    })
    .catch(error => {
      if (error.name !== 'Unauthorized') {
        logger.log('warn', 'Error sending to Gmail thread', error)
        return refreshAccessTokenAndContinue(refreshToken, google.sendGmail, { email, threadId })
      }
      throw new Unauthorized({ type: 'Google' })
    })
}

const refreshAccessTokenAndContinue = (refreshToken, callback, args) => {
  return google.getAccessTokenFromRefreshToken(refreshToken)
    .then(accessToken => {
      args.accessToken = accessToken
      return callback(args)
    })
    .catch((error) => {
      logger.log('error', 'Error refreshing access token', error)
      throw new Unauthorized({ type: 'Google' })
    })
}

const sendGmailAndLogResponse = (email, accessToken, refreshToken) => {
  return google.sendGmail({ email, accessToken })
    .then(response => {
      logger.log('warn', 'email response', response, email)
      return response.threadId
    })
    .catch(error => {
      logger.log('error', 'Error sending Gmail', error)
      return refreshAccessTokenAndContinue(refreshToken, google.sendGmail, { email })
        .then(response => response.threadId)
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
  sendByThread,
  getThreadMessages,
  getAccountForPerson
}
