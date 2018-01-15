const mockData = require('./mock-data')
const mockGoogleRequests = require('./google/mock-requests')

const mockExternalRequests = (callback) => {
  // Add different types of mocked external requests here
  mockGoogleRequests()
  callback && callback()
}

module.exports = {
  mockData,
  mockExternalRequests
}
