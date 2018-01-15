const { Base64 } = require('js-base64')
const createHash = require('hash-generator')
const uniqueId = require('lodash/uniqueId')
const toLower = require('lodash/toLower')
const pick = require('lodash/pick')
const request = require('@nudj/library/request')

const url = `http://${process.env.API_HOST}:81`

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

  return pick(data, ['body', 'date', 'id', 'sender', 'recipient'])
}

module.exports = async (uri, body, callback) => {
  const threadId = createHash(8)
  const email = await parseBody(body.raw)
  const data = {
    id: `MESSAGE_${threadId}_${uniqueId()}`,
    ...email
  }
  const method = 'post'
  await request(`${url}/messages`, {
    method,
    data
  })
  callback(null, [200, { threadId }])
}
