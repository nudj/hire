const nock = require('nock')
const mockSend = require('./send')
const mockThreadFetch = require('./thread-fetch')
const {
  threadIds,
  VALID_ACCESS_TOKEN
} = require('./constants')

const google = nock('https://www.googleapis.com').persist()

const mockGoogleRequests = () => {
  google
    .get('/oauth2/v1/tokeninfo')
    .query({ access_token: VALID_ACCESS_TOKEN })
    .reply(200)
  google
    .post('/gmail/v1/users/me/messages/send')
    .reply(mockSend)

  threadIds.forEach(id => {
    google
      .get(`/gmail/v1/users/me/threads/${id}`)
      .reply(mockThreadFetch)
  })
}

module.exports = mockGoogleRequests
