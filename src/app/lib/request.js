const axios = require('axios')
const get = require('lodash/get')
const {
  Unauthorized,
  NotFound,
  AppError
} = require('@nudj/framework/errors')

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
      switch (get(error, 'response.status')) {
        case 401:
          throw new Unauthorized({ type: error.response.data })
        case 404:
          throw new NotFound(`request - ${config.baseURL}${uri}`, options)
        default:
          throw new AppError(error.message, `request - ${config.baseURL}${uri}`, options)
      }
    })
}

module.exports = request
