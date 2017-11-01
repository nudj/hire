const { promiseMap } = require('@nudj/library')

const request = require('../../lib/request')

function createMessage (conversation, providerId, pixelToken) {
  const data = {
    conversation,
    providerId,
    pixelToken,
    readCount: 0
  }
  const method = 'post'
  return request(`messages`, { data, method })
}

module.exports.post = function (data, conversation, providerId, pixelToken) {
  data.message = createMessage(conversation, providerId, pixelToken)
  return promiseMap(data)
}
