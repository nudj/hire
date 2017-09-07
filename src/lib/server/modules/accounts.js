const request = require('../../lib/request')
const { toQs } = require('@nudj/library')

module.exports.getByFilters = (filters) => {
  return request(`accounts/filter?${toQs(filters)}`)
    .then(results => results.pop())
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
