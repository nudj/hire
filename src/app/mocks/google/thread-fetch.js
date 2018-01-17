const { Base64 } = require('js-base64')
const filter = require('lodash/filter')
const request = require('@nudj/library/request')

const url = `http://${process.env.API_HOST}:81`

const fetchEmailFromPerson = async (id) => {
  const person = await request(`${url}/people/${id}`)
  return person.email
}

const threadTemplate = async ({ id, body, from, subject, to, date }) => {
  to = await fetchEmailFromPerson(to)
  from = await fetchEmailFromPerson(from)
  return {
    id,
    internalDate: date,
    payload: {
      headers: [
        {
          name: 'Subject',
          value: subject || 'Placeholder subject'
        },
        {
          name: 'To',
          value: to
        },
        {
          name: 'From',
          value: from
        }
      ],
      body: {
        data: Base64.encode(body)
      }
    }
  }
}

const formatAsThread = (messages) => {
  return Promise.all(messages.map(message => threadTemplate(message)))
}

module.exports = async (uri, body, callback) => {
  const threadId = uri.split('/').pop()
  const allMessages = await request(`${url}/messages`)
  const filteredMessages = filter(allMessages, (message) => {
    return message.id.split('-')[0] === threadId
  })
  const messages = await formatAsThread(filteredMessages)
  callback(null, [200, { messages }])
}
