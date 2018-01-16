const nock = require('nock')
const mockSend = require('./mock-send')
const mockThreadFetch = require('./mock-thread-fetch')
const { threadIds } = require('./mock-tokens')

const google = nock('https://www.googleapis.com').persist()
const gmail = nock('https://www.googleapis.com/gmail/v1/users/me', {
  reqheaders: {
    authorization: `Bearer VALID_ACCESS_TOKEN`
  }
}).persist()

const mockGoogleRequests = () => {
  google
    .get('/oauth2/v1/tokeninfo')
    .query({ access_token: 'VALID_ACCESS_TOKEN' })
    .reply(200)
  google
    .post('/gmail/v1/users/me/messages/send')
    .reply(mockSend)

  threadIds.forEach(id => {
    gmail
      .get(`/threads/${id}`)
      .reply(mockThreadFetch)
  })
}

module.exports = mockGoogleRequests
