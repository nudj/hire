const get = require('lodash/get')
const find = require('lodash/find')
const parser = require('node-email-reply-parser')
const { Base64 } = require('js-base64')
const createHash = require('hash-generator')
const logger = require('@nudj/framework/logger')
const { Unauthorized } = require('@nudj/framework/errors')
const { merge, promiseMap } = require('@nudj/library')

const google = require('../lib/google')
const templater = require('../../lib/templater')
const accounts = require('./accounts')
const { getDataBuilderFor } = require('../../lib/tags')

const hashLength = 16

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
    const date = messageData.internalDate

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
      if (error.name !== Unauthorized.name) {
        logger.log('error', 'Error fetching thread', error)
        return refreshAccessTokenAndContinue(refreshToken, google.getThread, { threadId })
          .then(response => formatThreadMessages(response.messages))
      }
      throw new Unauthorized({ type: 'Google' })
    })
}

const getThreadMessages = (data, threadId, person) => {
  data.threadMessages = fetchMessagesByThread(threadId, person)
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
      if (error.name !== Unauthorized.name) {
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
  const pixelToken = createHash(hashLength)
  const trackedEmail = templater.appendTrackingToken(email, pixelToken)

  return google.sendGmail({ email: trackedEmail, accessToken })
    .then(response => {
      logger.log('email response', response, email)
      return merge(response, { pixelToken })
    })
    .catch(error => {
      logger.log('error', 'Error sending Gmail', error)
      return refreshAccessTokenAndContinue(refreshToken, google.sendGmail, { email: trackedEmail })
        .then(response => merge(response, { pixelToken }))
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
    to: process.env.TEST_EMAIL_ADDRESS // get(data, 'recipient.email')
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
