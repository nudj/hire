const nock = require('nock')
const { Base64 } = require('js-base64')
const createHash = require('hash-generator')
const toLower = require('lodash/toLower')
const pick = require('lodash/pick')
const request = require('@nudj/library/request')

const { VALID_ACCESS_TOKEN } = require('./mock-constants')
const mockThreadFetch = require('./mock-thread-fetch')

const url = `http://${process.env.API_HOST}:81`

const addThreadListener = (thread) => {
  nock('https://www.googleapis.com/gmail/v1/users/me', {
    reqheaders: {
      authorization: `Bearer ${VALID_ACCESS_TOKEN}`
    }
  })
    .persist()
    .get(`/threads/${thread}`)
    .reply(mockThreadFetch)
}

const fetchPersonFromEmail = async (email) => {
  const person = await request(`${url}/people/filter?email=${email}`)
  return person[0].id
}

const parseBody = async (rawMessage) => {
  const decoded = Base64.decode(rawMessage).split('\r\n')
  const body = decoded[decoded.length - 1]
  const data = decoded.reduce((email, entry) => {
    if (entry.includes(':')) {
      const [key, value] = entry.split(':')
      email[toLower(key)] = value.trim()
    }
    return email
  }, { body })
  data.recipient = await fetchPersonFromEmail(data.to)
  data.sender = 'person5'
  delete data.to
  delete data.from

  return pick(data, ['body', 'sender', 'recipient'])
}

module.exports = async (uri, body, callback) => {
  let threadId = body.threadId
  if (!threadId) {
    threadId = createHash(8)
    addThreadListener(threadId)
  }
  const email = await parseBody(body.raw)
  const data = {
    id: `${threadId}-${createHash(8)}`,
    date: new Date(),
    ...email
  }
  const method = 'post'
  await request(`${url}/messages`, {
    method,
    data
  })
  callback(null, [200, { threadId }])
}
