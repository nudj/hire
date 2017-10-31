const { promiseMap } = require('@nudj/library')

const request = require('../../lib/request')

function createConversation (hirer, recipient, job, threadId, provider) {
  const data = {
    hirer,
    recipient,
    job,
    threadId,
    provider
  }
  const method = 'post'
  return request(`conversations`, { data, method })
}

module.exports.post = function (data, hirer, recipient, job, threadId, provider) {
  data.conversation = createConversation(hirer, recipient, job, threadId, provider)
  return promiseMap(data)
}
