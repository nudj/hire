const reject = require('lodash/reject')
const concat = require('lodash/concat')
const { merge } = require('@nudj/library')
const {
  SET_VALUE,
  SET_ANSWER,
  TOGGLE_ANSWER
} = require('./actions')

const removeFromArray = (arr, itemToRemove) => reject(arr, item => itemToRemove === item)
const addToArray = concat
const filterFormByResets = (survey, resets) => {
  resets.forEach((field) => Reflect.deleteProperty(survey, field))
  return survey
}

const setValue = (state, action) => {
  return merge(state, {
    [action.name]: action.value
  })
}

const setAnswer = (state, action) => {
  state.answers = filterFormByResets(state.answers, action.resets)
  state.answers[action.name] = action.value
  return merge(state)
}

const toggleAnswer = (state, action) => {
  const modifierFunction = action.toggle ? addToArray : removeFromArray
  state.answers = filterFormByResets(state.answers, action.resets)
  state.answers[action.name] = modifierFunction(state.answers[action.name] || [], action.value)
  return merge(state)
}

const actions = {
  [SET_VALUE]: setValue,
  [SET_ANSWER]: setAnswer,
  [TOGGLE_ANSWER]: toggleAnswer
}

const initialState = {
  step: 0,
  answers: {},
  connections: null
}

const reducer = (state = initialState, action) => {
  const type = action.type
  return actions[type] ? actions[type](state, action) : state
}

module.exports = reducer
