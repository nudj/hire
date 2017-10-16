const request = require('../../lib/request')
const get = require('lodash/get')
const google = require('../lib/google')
const logger = require('@nudj/framework/logger')
const {
  toQs,
  promiseMap
} = require('@nudj/library')

function verifyOrRefreshGoogleAuthenticationStatus (person) {
  return getAccountByFilters({person})
    .then(account => {
      if (!get(account, 'providers.google.accessToken')) {
        throw new Error('No access token')
      }
      const accessToken = get(account, 'providers.google.accessToken')
      const refreshToken = get(account, 'providers.google.refreshToken')
      return google.verifyOrRefreshAccessToken(accessToken, refreshToken)
        .then(accessToken => updateAccountAccessToken(account, accessToken))
        .then(() => {
          return true // User is successfully authorised with Google
        })
    })
    .catch(error => {
      logger.log('Authentication error', error)
      return removeStaleGoogleAccountForPerson(person)
        .then(() => {
          return false // User is not successfully authorised with Google
        })
    })
}

function updateAccountAccessToken (account, accessToken) {
  if (!get(account, 'providers.google')) {
    throw new Error('No google account')
  }
  account.providers.google.accessToken = accessToken
  return request(`accounts/${account.id}`, { method: 'patch', data: account })
}

function removeStaleGoogleAccountForPerson (person) {
  return getAccountByFilters({person})
    .then(account => {
      if (account) {
        return request(`accounts/${account.id}`, { method: 'delete' })
      }
    })
}

function getAccountByFilters (filters) {
  return request(`accounts/filter?${toQs(filters)}`)
  .then(results => results.pop())
}

module.exports.getByFilters = (filters) => {
  return getAccountByFilters(filters)
}

module.exports.verifyGoogleAuthentication = (data, person) => {
  data.googleAuthenticated = verifyOrRefreshGoogleAuthenticationStatus(person)
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
