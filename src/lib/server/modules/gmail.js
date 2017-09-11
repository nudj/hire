const { promiseMap } = require('@nudj/library')
const get = require('lodash/get')
const gmailer = require('../lib/gmailer')
const logger = require('../../lib/logger')
const templater = require('../../lib/templater')
const conversations = require('./conversations')
const externalMessages = require('./external-messages')
const accounts = require('./accounts')
const tags = require('../../lib/tags')

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
  return conversations.post(data, data.hirer.id, data.recipient.id, conversation, 'GMAIL')
    .then(data => {
      if (data.externalMessage) {
        return externalMessages.patch(data, data.externalMessage.id, {sent: true})
      }
      return promiseMap(data)
    })
}

const send = (data, person) => {
  const senderFirstName = get(data, 'person.firstName', 'FIRST_NAME')
  const senderLastName = get(data, 'person.lastName', 'SECOND_NAME')

  const message = templater.render(
    {
      data: tags.getDataBuilderFor(tags.external, data),
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
    .then(account => sendGmailAndLogResponse(email, account.accessToken))
    .then(conversation => saveConversationAndMarkAsSent(data, conversation))
}

module.exports = { send }
