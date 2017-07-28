let request = require('../../lib/request')

function fetchPersonFromFragment (fragment) {
  return request(`people/${fragment.person || fragment}`)
}

module.exports.fetchPersonFromFragment = fetchPersonFromFragment

module.exports.fetchPeopleFromFragments = function (fragments) {
  return Promise.all(fragments.map((fragment) => fetchPersonFromFragment(fragment)))
}
