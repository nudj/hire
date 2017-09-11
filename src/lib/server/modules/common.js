const isAfter = require('date-fns/is_after')

let request = require('../../lib/request')

function fetchPersonFromFragment (fragment) {
  console.log(fragment)
  if (fragment.recipients) {
    fragment.recipient = fragment.recipients.pop()
  }
  return request(`people/${fragment.person || fragment.recipient || fragment}`)
}

module.exports.fetchPersonFromFragment = fetchPersonFromFragment

module.exports.fetchPeopleFromFragments = function (fragments) {
  return Promise.all(fragments.map((fragment) => fetchPersonFromFragment(fragment)))
}

module.exports.sortByModified = function (a, b) {
  return isAfter(a.modified, b.modified) ? 1 : -1
}
