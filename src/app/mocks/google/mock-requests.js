const nock = require('nock')
const mockSend = require('./mock-send')

const google = nock('https://www.googleapis.com').persist()

const mockGoogleRequests = () => {
  google
    .get('/oauth2/v1/tokeninfo')
    .query({ access_token: 'VALID_ACCESS_TOKEN' })
    .reply(200)

  google
    .post('/gmail/v1/users/me/messages/send')
    .reply(mockSend)
}

module.exports = mockGoogleRequests
