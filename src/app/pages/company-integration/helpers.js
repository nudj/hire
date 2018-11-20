const startCase = require('lodash/startCase')
const get = require('lodash/get')

const errorMessageConversion = {
  harvestKey: {
    401: () => 'Invalid key',
    403: (key) => `"${startCase(key)}" permissions have not been set correctly`
  },
  partnerKey: {
    401: () => 'Invalid key or user'
  }
}

function convertErrorToErroredField (initialError) {
  // This function will take an error from the server and convert it into
  // a field and an error message to be displayed on the form to the user
  const error = get(initialError, 'fields[0]', {})
  let message

  if (error.field && error.code) {
    const fetchError = errorMessageConversion[error.field][error.code]

    message = fetchError ? fetchError(error.endpoint) : 'Something went wrong'
    message = errorMessageConversion[error.field][error.code](error.endpoint)
  }

  return { field: error.field, message }
}

module.exports = { convertErrorToErroredField }
