const logger = require('./logger')

function NudjError (message, type, data) {
  this.name = 'NudjError'
  this.message = message
  this.type = type
  this.data = data
  Error.captureStackTrace(this, NudjError)
  logger.log('error', this)
}
NudjError.prototype = Error.prototype

module.exports = NudjError
