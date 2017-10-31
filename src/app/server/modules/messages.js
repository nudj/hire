const createHash = require('hash-generator')
const { promiseMap } = require('@nudj/library')

const request = require('../../lib/request')

const hashLength = 16

function createPixel (pixelData) {
  const token = createHash(hashLength)
  const data = {
    token,
    count: 0,
    data: pixelData
  }
  const method = 'post'
  return request(`messages`, { data, method })
}

module.exports.post = function (data, pixelData) {
  data.pixel = createPixel(pixelData)
  return promiseMap(data)
}
