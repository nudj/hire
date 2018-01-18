const nock = require('nock')
const { Base64 } = require('js-base64')
const createHash = require('hash-generator')
const toLower = require('lodash/toLower')
const pick = require('lodash/pick')
const request = require('@nudj/library/request')

const { VALID_ACCESS_TOKEN } = require('./constants')
const mockThreadFetch = require('./thread-fetch')

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
  const metaDataFinishIndex = decoded.indexOf('MIME-Version: 1.0')

  const body = decoded.slice(
    metaDataFinishIndex + 2,
    decoded.length
  ).join('\n')

  const data = decoded.reduce((email, entry) => {
    if (entry.includes(':')) {
      const [key, value] = entry.split(':')
      email[toLower(key)] = value.trim()
    }
    return email
  }, { body })
  data.to = await fetchPersonFromEmail(data.to)
  data.from = 'person5'

  return pick(data, ['body', 'to', 'from'])
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
