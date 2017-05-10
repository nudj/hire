const Axios = require('axios')

let config = {
  baseURL: '/',
  headers: {
    'Accept': 'application/json'
  }
}
try {
  if (process.title === 'node') {
    config.baseURL = 'http://api:81/'
  }
} catch (error) {
  console.log('Browser')
}
const axios = Axios.create(config)

function request (uri, options) {
  return axios(uri, options)
    .then((response) => {
      switch (response.status === 500) {
        case 500:
          throw new Error(response.statusText)
        case 404:
          return undefined
      }
      return response.data
    })
    .catch((error) => {
      console.log('error', error.message, `request - ${config.baseURL}${uri}`, options)
      throw new Error('Something went wrong')
    })
}

module.exports = request
