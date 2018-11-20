const startCase = require('lodash/startCase')
const get = require('lodash/get')

const harvestAPIErrorConversion = {
  401: () => 'Invalid key',
  403: (key) => `"${startCase(key)}" permissions have not been set correctly`
}

function convertErrorToErroredFields (initialError) {
  // This function will take an error from the server and convert it into
  // fields with error messages to be displayed on the form to the user
  const error = get(initialError, 'fields[0]', {})

  let message

  if (error.field === 'partnerKey' && error.code === 401) {
    // If the partnerKey errors in this way, Greenhouse does not distinguish between
    // the user being incorrect and the Partner API key being incorrect.
    message = 'Partner verification failed - invalid user or key'
    return {
      partnerKey: message,
      user: message
    }
  }

  if (error.code && error.field === 'harvestKey') {
    const convertedMessage = harvestAPIErrorConversion[error.code](error.endpoint)
    message = convertedMessage || 'Something went wrong'
  }

  return { [error.field]: message }
}

module.exports = { convertErrorToErroredFields }
