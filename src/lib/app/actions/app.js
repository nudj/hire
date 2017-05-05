const ADD_TODO = 'ADD_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'
const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

module.exports.ADD_TODO = ADD_TODO
module.exports.TOGGLE_TODO = TOGGLE_TODO
module.exports.SET_VISIBILITY_FILTER = SET_VISIBILITY_FILTER

module.exports.addTodo = function (text) {
  return { type: ADD_TODO, text }
}

module.exports.toggleTodo = function (index) {
  return { type: TOGGLE_TODO, index }
}

module.exports.setVisibilityFilter = function (filter) {
  return { type: SET_VISIBILITY_FILTER, filter }
}
