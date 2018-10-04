/* global expect asyncTest */
/* eslint-env mocha */
const nock = require('nock')
const { Unauthorized } = require('@nudj/library/errors')

const gmail = require('../../../app/server/modules/gmail')

const api = nock(`http://${process.env.API_HOST}:${process.env.API_PORT}`)
const googleAccounts = nock('https://accounts.google.com')
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

const mockAccounts = () => {
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
}

const mockGmailSend = () => {
  validTokenGoogle
    .post('/messages/send')
    .reply(200, { response: 'gmailSentResponse', threadId: 'gmailThread' })
  invalidTokenGoogle
    .post('/messages/send')
    .replyWithError('Invalid Access Token')
  googleAccounts
    .post('/o/oauth2/token')
    .reply(200, { access_token: 'validAccessToken' })
}

const mockGmailThreads = () => {
  validTokenGoogle
    .get('/threads/threadId')
    .reply(200, {
      messages: [
        {
          id: 'MessageId',
          internalDate: 'test_date',
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
}

describe('Gmail', () => {
  nock.emitter.on('no match', function (req) {
    console.log('No match for request:', req)
  })

  beforeEach(() => {
    mockAccounts()
  })

  afterEach(() => {
    nock.cleanAll()
  })

  describe('getAccountForPerson', () => {
    it('returns google account details for a valid personId', asyncTest(async () => {
      const data = await gmail.getAccountForPerson('personId')
      expect(data).to.deep.equal({
        accessToken: 'validAccessToken',
        refreshToken: 'refreshToken'
      })
    }))

    it('returns an Unauthorized when given an invalid personId', asyncTest(async () => {
      await expect(gmail.getAccountForPerson('unauthorizedId')).to.be.rejectedWith(Unauthorized)
    }))
  })

  describe('sendByThread', () => {
    beforeEach(() => {
      mockGmailSend()
    })

    it('sends an email if the accessToken is valid', asyncTest(async () => {
      const data = await gmail.sendByThread('emailBody', 'personId', 'threadId')
      expect(data.response).to.equal('gmailSentResponse')
    }))

    it('refreshes access token if invalid', asyncTest(async () => {
      const data = await gmail.sendByThread('emailBody', 'expiredId', 'threadId')
      expect(data.response).to.equal('gmailSentResponse')
    }))

    it('throws an unauthorized error when no account exists', asyncTest(async () => {
      await expect(gmail.sendByThread('emailBody', 'unauthorizedId', 'threadId')).to.eventually.be.rejectedWith(Unauthorized)
    }))
  })

  describe('send', () => {
    beforeEach(() => {
      mockGmailSend()
    })

    it('throws an unauthorized error when no account exists', asyncTest(async () => {
      await expect(gmail.send({ template: 'FirstLine\n\nSecondLine' }, 'unauthorizedId', 'threadId')).to.be.rejectedWith(Unauthorized)
    }))

    it('sends an email and returns the new threadId if the accessToken is valid', asyncTest(async () => {
      const data = await gmail.send({ template: 'FirstLine\n\nSecondLine' }, 'personId', 'threadId')
      expect(data.threadId).to.equal('gmailThread')
    }))

    it('returns the google response body after sending', asyncTest(async () => {
      const data = await gmail.send({ template: 'FirstLine\n\nSecondLine' }, 'personId', 'threadId')
      expect(data.response).to.equal('gmailSentResponse')
    }))

    it('returns the appended pixelToken in the response', asyncTest(async () => {
      const data = await gmail.send({ template: 'FirstLine\n\nSecondLine' }, 'personId', 'threadId')
      expect(data.pixelToken).to.exist()
    }))

    it('refreshes access token if invalid', asyncTest(async () => {
      const data = await gmail.send({ template: 'FirstLine\n\nSecondLine' }, 'expiredId', 'threadId')
      expect(data.threadId).to.equal('gmailThread')
    }))
  })

  describe('getThreadMessages', () => {
    beforeEach(() => {
      mockGmailThreads()
    })

    it('throws an unauthorized error when no account exists', asyncTest(async () => {
      await expect(gmail.getThreadMessages({}, 'threadId', 'unauthorizedId')).to.be.rejectedWith(Unauthorized)
    }))

    it('decrypts and formats the thread message body', asyncTest(async () => {
      const data = await gmail.getThreadMessages({}, 'threadId', 'personId')
      const threadMessage = data.threadMessages.pop()
      expect(threadMessage.body).to.equal('THAT AWESOME')
    }))

    it('places threadMessages on to data object', asyncTest(async () => {
      const data = await gmail.getThreadMessages({}, 'threadId', 'personId')
      const message = data.threadMessages.pop()
      expect(message).to.have.property('body', 'THAT AWESOME')
      expect(message).to.have.property('id', 'MessageId')
      expect(message).to.have.property('sender', 'Sender Name')
      expect(message.date).to.be.a('string')
    }))

    it('retains existing data on the data object', asyncTest(async () => {
      const data = await gmail.getThreadMessages({ existingData: true }, 'threadId', 'personId')
      expect(data.existingData).to.equal(true)
    }))

    it('refreshes access token if invalid and continues', asyncTest(async () => {
      const data = await gmail.getThreadMessages({}, 'threadId', 'expiredId')
      const message = data.threadMessages.pop()
      expect(message).to.have.property('body', 'THAT AWESOME')
      expect(message).to.have.property('id', 'MessageId')
      expect(message).to.have.property('sender', 'Sender Name')
      expect(message.date).to.be.a('string')
    }))
  })
})
