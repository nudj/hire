const createHash = require('hash-generator')
const { promiseMap } = require('@nudj/library')

const request = require('../../lib/request')

const hashLength = 16

function createToken (type, tokenData) {
  const hash = createHash(hashLength)
  const data = {
    data: tokenData,
    token: hash,
    type: type
  }
  const method = 'post'
  return request(`tokens`, { data, method })
}

function fetchToken (token) {
  return request(`tokens/filter?token=${token}`)
    .then(results => results.pop())
}

function fetchTokenById (id) {
  return request(`tokens/filter?id=${id}`)
    .then(results => results.pop())
}

function fetchTokensByType (type) {
  return request(`tokens/filter?type=${type}`)
}

module.exports.get = function (data, token) {
  data.token = fetchToken(token)
  return promiseMap(data)
}

module.exports.getById = function (data, id) {
  data.token = fetchTokenById(id)
  return promiseMap(data)
}

module.exports.getByType = function (data, tokenData) {
  data.tokens = fetchTokensByType(tokenData)
  return promiseMap(data)
}

module.exports.post = function (data, type, tokenData) {
  data.newToken = createToken(type, tokenData)
  return promiseMap(data)
}
