const request = require('../../lib/request')

const getById = (id) => {
  return request(`conversations/${id}`)
}

const post = (hirer, recipient, job, threadId, provider) => {
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

module.exports = {
  post,
  getById
}
