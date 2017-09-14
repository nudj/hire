const request = require('../../lib/request')
const get = require('lodash/get')
const {
  toQs,
  promiseMap
} = require('@nudj/library')

function fetchAccessToken (provider, person) {
  return module.exports.getByFilters(person)
    .then(account => get(account, `providers.${provider}.accessToken`))
}

module.exports.getByFilters = (filters) => {
  return request(`accounts/filter?${toQs(filters)}`)
    .then(results => results.pop())
}

module.exports.verifyGoogleAuthentication = (data, person) => {
  data.googleAuthenticated = fetchAccessToken('google', person)
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
