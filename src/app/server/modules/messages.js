const request = require('../../lib/request')

const post = (conversation, providerId, pixelToken) => {
  const data = {
    conversation,
    providerId,
    pixelToken,
    readCount: 0
  }
  const method = 'post'
  return request(`messages`, { data, method })
}

const getByConversation = (conversation) => {
  return request(`messages/filter?conversation=${conversation}`)
}

module.exports = {
  post,
  getByConversation
}
