const isAfter = require('date-fns/is_after')
const flatten = require('lodash/flatten')

let request = require('../../lib/request')

function fetchPersonFromFragment (fragment) {
  return request(`people/${fragment.person || fragment.recipient || fragment}`)
}

module.exports.fetchPersonFromFragment = fetchPersonFromFragment

module.exports.fetchPeopleFromFragments = function (fragments) {
  return Promise.all(fragments.map((fragment) => fetchPersonFromFragment(fragment)))
}

module.exports.fetchAllRecipientsFromFragments = function (fragments) {
  const recipients = flatten(fragments.map((fragment) => fragment.recipients))
  return Promise.all(recipients.map((recipient) => fetchPersonFromFragment(recipient)))
}

module.exports.sortByModified = function (a, b) {
  return isAfter(a.modified, b.modified) ? 1 : -1
}
