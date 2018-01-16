const nock = require('nock')
const logger = require('@nudj/framework/logger')
const mockData = require('./data')
const mockGoogleRequests = require('./google/requests')

const stopMocks = (message) => {
  nock.cleanAll()
  logger.log('warn', message)
}

const mockExternalRequests = (callback) => {
  process.on('unhandledRejection', error => {
    console.log(error.log, ...(error.log || []))
  })
  process.on('exit', (code) => {
    stopMocks(`Process terminated with exit code: ${code}`)
  })

  // Add different types of mocked external requests here
  mockGoogleRequests()
  callback && callback()
}

module.exports = {
  mockData,
  mockExternalRequests
}
