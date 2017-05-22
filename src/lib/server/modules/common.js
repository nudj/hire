let request = require('../../lib/request')

module.exports.fetchPeopleFromFragments = function (fragments) {
  return Promise.all(fragments.map((fragment) => request(`people/${fragment.personId || fragment}`)))
}
