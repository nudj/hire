/* global expect */
/* eslint-env mocha */
const nock = require('nock')
const { Unauthorized } = require('@nudj/framework/errors')

const gmail = require('../../app/server/modules/gmail')

describe('Gmail module', () => {
  const api = nock('http://127.0.0.1:81')
  const validTokenGoogle = nock('https://www.googleapis.com/gmail/v1/users/me', {
    reqheaders: {
      authorization: 'Bearer validAccessToken'
    }
  })

  const invalidTokenGoogle = nock('https://www.googleapis.com/gmail/v1/users/me', {
    reqheaders: {
      authorization: 'Bearer badToken'
    }
  })
  const googleAccounts = nock('https://accounts.google.com')

  nock.emitter.on('no match', function (req) {
    console.log('No match for request:', req)
  })

  beforeEach(() => {
    api
      .get('/accounts/filter')
      .query({ person: 'unauthorizedId' })
      .reply(200, [])
    api
      .get('/accounts/filter')
      .query({ person: 'personId' })
      .reply(200, [{ providers: { google: { accessToken: 'validAccessToken', refreshToken: 'refreshToken' } } }])
    api
      .get('/accounts/filter')
      .query({ person: 'expiredId' })
      .reply(200, [{ providers: { google: { accessToken: 'badToken', refreshToken: 'refreshToken' } } }])
  })

  afterEach(() => {
    nock.cleanAll()
  })

  describe('getAccountForPerson', () => {
    it('returns google account details for a valid personId', () => {
      return expect(gmail.getAccountForPerson('personId')).to.eventually.deep.equal({
        accessToken: 'validAccessToken',
        refreshToken: 'refreshToken'
      })
    })

    it('returns an Unauthorized when given an invalid personId', () => {
      return expect(gmail.getAccountForPerson('unauthorizedId')).to.eventually.be.rejectedWith(Unauthorized)
    })
  })

  describe('sendByThread', () => {
    beforeEach(() => {
      validTokenGoogle
        .post('/messages/send')
        .reply(200, { response: 'gmailSentResponse' })
      invalidTokenGoogle
        .post('/messages/send')
        .replyWithError('Invalid Access Token')
      googleAccounts
        .post('/o/oauth2/token')
        .reply(200, { access_token: 'validAccessToken' })
    })

    afterEach(() => {
      nock.cleanAll()
    })

    it('sends an email if the accessToken is valid', () => {
      return expect(gmail.sendByThread('emailBody', 'personId', 'threadId')).to.eventually.have.property('response')
    })

    it('refreshes access token if invalid', () => {
      return gmail.sendByThread('emailBody', 'expiredId', 'threadId')
        .then(data => {
          expect(data.response).to.equal('gmailSentResponse')
        })
    })

    it('throws an unauthorized error when no account exists', () => {
      return expect(gmail.sendByThread('emailBody', 'unauthorizedId', 'threadId')).to.eventually.be.rejectedWith(Unauthorized)
    })
  })

  describe('send', () => {
    beforeEach(() => {
      validTokenGoogle
        .post('/messages/send')
        .reply(200, { response: 'gmailSentResponse', threadId: 'gmailThread' })
      invalidTokenGoogle
        .post('/messages/send')
        .replyWithError('Invalid Access Token')
      googleAccounts
        .post('/o/oauth2/token')
        .reply(200, { access_token: 'validAccessToken' })
    })

    afterEach(() => {
      nock.cleanAll()
    })

    it('throws an unauthorized error when no account exists', () => {
      return expect(gmail.send({ template: 'FirstLine\n\nSecondLine' }, 'unauthorizedId', 'threadId')).to.eventually.be.rejectedWith(Unauthorized)
    })

    it('sends an email and returns the new threadId if the accessToken is valid', () => {
      return expect(gmail.send({ template: 'FirstLine\n\nSecondLine' }, 'personId', 'threadId')).to.eventually.have.property('threadId', 'gmailThread')
    })

    it('returns the google response body after sending', () => {
      return expect(gmail.send({ template: 'FirstLine\n\nSecondLine' }, 'personId', 'threadId')).to.eventually.have.property('response', 'gmailSentResponse')
    })

    it('returns the appended pixelToken in the response', () => {
      return expect(gmail.send({ template: 'FirstLine\n\nSecondLine' }, 'personId', 'threadId')).to.eventually.have.property('pixelToken')
    })

    it('refreshes access token if invalid', () => {
      return expect(gmail.send({ template: 'FirstLine\n\nSecondLine' }, 'expiredId', 'threadId')).to.eventually.have.property('threadId', 'gmailThread')
    })
  })

  describe('getThreadMessages', () => {
    beforeEach(() => {
      validTokenGoogle
        .get('/threads/threadId')
        .reply(200, {
          messages: [
            {
              id: 'MessageId',
              payload: {
                headers: [{ name: 'From', value: 'Sender Name' }],
                parts: [{ body: { data: 'VEhBVCBBV0VTT01FD' } }]
              }
            }
          ]
        })
      invalidTokenGoogle
        .get('/threads/threadId')
        .replyWithError('Invalid Access Token')
      googleAccounts
        .post('/o/oauth2/token')
        .reply(200, { access_token: 'validAccessToken' })
    })

    afterEach(() => {
      nock.cleanAll()
    })

    it('throws an unauthorized error when no account exists', () => {
      return expect(gmail.getThreadMessages({}, 'threadId', 'unauthorizedId')).to.eventually.be.rejectedWith(Unauthorized)
    })

    it('decrypts and formats the thread message body', () => {
      return gmail.getThreadMessages({}, 'threadId', 'personId')
        .then(data => {
          const threadMessage = data.conversationMessages.pop()
          expect(threadMessage.body).to.equal('THAT AWESOME')
        })
    })

    it('places conversationMessages on to data object', () => {
      return gmail.getThreadMessages({}, 'threadId', 'personId')
        .then(response => {
          const message = response.conversationMessages.pop()
          expect(message).to.have.property('body', 'THAT AWESOME')
          expect(message).to.have.property('id', 'MessageId')
          expect(message).to.have.property('sender', 'Sender Name')
          expect(message.date).to.be.a('string')
        })
    })

    it('retains existing data on the data object', () => {
      return expect(gmail.getThreadMessages({ existingData: true }, 'threadId', 'personId')).to.eventually.have.property('existingData', true)
    })

    it('refreshes access token if invalid and continues', () => {
      return gmail.getThreadMessages({}, 'threadId', 'expiredId')
        .then(response => {
          const message = response.conversationMessages.pop()
          expect(message).to.have.property('body', 'THAT AWESOME')
          expect(message).to.have.property('id', 'MessageId')
          expect(message).to.have.property('sender', 'Sender Name')
          expect(message.date).to.be.a('string')
        })
    })
  })
})
