let nodeFetch = require('node-fetch')
let logger = require('./logger')

function fetch (uri, options) {
  return nodeFetch(`http://api:81/${uri}`, options)
    .then((response) => {
      if (response.status === 500) {
        throw new Error(response.statusText)
      }
      return response.json()
    })
    .then((data) => {
      if (data.code === 404) {
        return undefined
      } else {
        return data
      }
    })
    .catch((error) => {
      logger.log('error', error.message, `fetch - http://api:81/${uri}`, options)
      throw new Error('Something went wrong')
    })
}

module.exports = fetch
