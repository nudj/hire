const axios = require('axios')
const get = require('lodash/get')
const { ErrorThenUnauthorized } = require('@nudj/framework/errors')

const shallowMerge = (...args) => Object.assign({}, ...args)
const config = {
  baseURL: '/',
  headers: {
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
}
try {
  if (process.title === 'node') {
    config.baseURL = `http://${process.env.API_HOST}:81/`
  }
} catch (error) {
  console.log('Browser')
}

function request (uri, options = {}) {
  options = shallowMerge(config, options, {
    headers: shallowMerge(config.headers, options.headers)
  })
  return axios(uri, options)
    .then((response) => response.data)
    .catch((error) => {
      if (get(error, 'response.status') === 401) {
        console.log(error.response)
        switch (error.response.data) {
          case 'Google':
            throw new ErrorThenUnauthorized('Google')
          default:
            throw new ErrorThenUnauthorized('nudj')
        }
      }
      console.log('error', error.message, `request - ${options.baseURL}${uri}`, options)
      throw new Error('Something went wrong')
    })
}

module.exports = request
