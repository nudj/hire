const nock = require('nock')

const google = nock('https://www.googleapis.com').persist()

const mockGmailSend = () => {
  google
    .get('/oauth2/v1/tokeninfo')
    .query({ access_token: 'VALID_ACCESS_TOKEN' })
    .reply(200)

  google
    .post('/gmail/v1/users/me/messages/send')
    .reply(async (uri, body, callback) => {
      const data = await Promise.resolve({ threadId: 'VALID_GMAIL_THREAD_ID' })
      callback(null, [200, data])
    })
}

const mockGoogleRequests = (callback) => {
  mockGmailSend()
  callback && callback()
}

module.exports = mockGoogleRequests
