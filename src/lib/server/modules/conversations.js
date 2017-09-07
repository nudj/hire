const request = require('../../lib/request')
const { promiseMap } = require('@nudj/library')

module.exports.post = (data, hirer, recipient, conversationData, type) => {
  const conversation = {
    hirer: hirer.id,
    recipient: recipient.id,
    type,
    data: conversationData
  }

  data.conversation = request('conversations', {
    method: 'post',
    data: conversation
  })

  return promiseMap(data)
}

module.exports.getById = (data, conversationId) => {
  data.conversation = request(`conversations/filter?id=${conversationId}`)
  return promiseMap(data)
}
