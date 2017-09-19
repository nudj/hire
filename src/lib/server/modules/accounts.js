const request = require('../../lib/request')
const get = require('lodash/get')
const gmailer = require('../lib/gmailer')
const logger = require('../../lib/logger')
const {
  toQs,
  promiseMap
} = require('@nudj/library')

function fetchAccessToken (provider, person) {
  return module.exports.getByFilters(person)
    .then(account => get(account, `providers.google.accessToken`))
}

function checkGoogleTokenValidity (person, token) {
  return request(`/oauth2/v1/tokeninfo?access_token=${token}`, {
    baseURL: 'https://www.googleapis.com/'
  })
    .then(response => {
      return true
    })
    .catch(error => {
      logger.log('error', error)
      return refreshGoogleAccessTokenAndVerify(person)
    })
}

function refreshGoogleAccessTokenAndVerify (person) {
  return module.exports.refreshGoogleAccessToken(person)
    .then(response => {
      return true // New valid accessToken has been set
    })
    .catch(error => {
      logger.log('Google refresh token is invalid', error)
      return removeStaleGoogleAccountTokensForPerson(person)
        .then((account) => {
          return false // Stale tokens have been removed and user has revoked Google authentication.
        })
    })
}

function removeStaleGoogleAccountTokensForPerson (person) {
  return module.exports.getByFilters(person)
    .then(account => {
      if (account && get(account, 'providers.google')) {
        return request(`accounts/${account.id}`, { method: 'delete' })
      }
      return Promise.resolve(account)
    })
}

function verifyOrRefreshGoogleAccessToken (person) {
  return fetchAccessToken(person)
    .then(token => checkGoogleTokenValidity(person, token))
}

module.exports.getByFilters = (filters) => {
  return request(`accounts/filter?${toQs(filters)}`)
    .then(results => results.pop())
}

module.exports.refreshGoogleAccessToken = (person) => {
  return module.exports.getByFilters(person)
    .then(account => {
      const refreshToken = get(account, 'providers.google.refreshToken')
      if (!refreshToken) {
        throw new Error('No refresh token') // No refresh token has been stored or account was not found
      }
      return gmailer.getAccessTokenFromRefreshToken(refreshToken)
        .then(accessToken => {
          account.providers.google.accessToken = accessToken
          return request(`accounts/${account.id}`, {
            method: 'patch',
            data: account
          })
        })
    })
}

module.exports.verifyOrRefreshGoogleAuthentication = (data, person) => {
  data.googleAuthenticated = verifyOrRefreshGoogleAccessToken(person)
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
