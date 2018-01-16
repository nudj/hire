const nock = require('nock')
const logger = require('@nudj/framework/logger')
const mockData = require('./data')
const mockGoogleRequests = require('./google/requests')

const start = (callback) => {
  // Add different types of mocked external requests here
  mockGoogleRequests()
  callback && callback()
}

const stop = (message) => {
  nock.cleanAll()
  logger.log('warn', message)
}

const mockExternalRequests = { start, stop }

module.exports = {
  mockData,
  mockExternalRequests
}
