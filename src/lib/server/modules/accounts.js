const request = require('../../lib/request')
const get = require('lodash/get')
const {
  toQs,
  promiseMap
} = require('@nudj/library')

function fetchAccessToken (provider, person) {
  return module.exports.getByFilters(person)
    .then(account => get(account, `providers.google.accessToken`))
}

function checkGoogleTokenValidity (token) {
  return request(`/oauth2/v1/tokeninfo?access_token=${token}`, {
    baseURL: 'https://www.googleapis.com/'
  })
    .catch(error => {
      return { error } // Stored access token does not exist or is invalid
    })
}

function verifyGoogleAccessToken (person) {
  return fetchAccessToken(person)
    .then(token => checkGoogleTokenValidity(token))
    .then(response => !response.error)
}

module.exports.getByFilters = (filters) => {
  return request(`accounts/filter?${toQs(filters)}`)
    .then(results => results.pop())
}

module.exports.verifyGoogleAuthentication = (data, person) => {
  data.googleAuthenticated = verifyGoogleAccessToken(person)
  return promiseMap(data)
}

module.exports.createOrUpdate = (account) => {
  let response
  if (account.id) {
    response = request(`accounts/${account.id}`, {
      method: 'patch',
      data: account
    })
  } else {
    response = request('accounts', {
      method: 'post',
      data: account
    })
  }
  return response
}
