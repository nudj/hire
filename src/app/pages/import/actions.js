const get = require('lodash/get')
const Papa = require('papaparse')
const actions = require('@nudj/framework/actions')

const PREFIX = 'IMPORT'

const SET_VALUE = `${PREFIX}_SET_VALUE`
module.exports.SET_VALUE = SET_VALUE
function setValue (key, value) {
  return {
    type: SET_VALUE,
    key,
    value
  }
}

const SET_CONNECTIONS = `${PREFIX}_SET_CONNECTIONS`
module.exports.SET_CONNECTIONS = SET_CONNECTIONS
function setConnections (connections) {
  return {
    type: SET_CONNECTIONS,
    connections
  }
}

module.exports.setNetwork = network => (dispatch, getState) => {
  return dispatch(setValue('network', network))
}

module.exports.setActive = active => (dispatch, getState) => {
  return dispatch(setValue('active', active))
}

module.exports.parse = file => (dispatch, getState) => {
  dispatch(setValue('parsing', true))
  Papa.parse(file, {
    header: true,
    dynamicTyping: true,
    complete: results => {
      const linkedInData = get(results, 'data', [])
      const connections = convertLinkedInToNudjPeople(linkedInData)
      dispatch(setConnections(connections))
    }
  })
}

function convertLinkedInToNudjPeople (connections) {
  return connections
    .map(convertLinkedInToNudjPerson)
    .filter(person => person.email)
    .sort((a, b) => {
      if (a.firstName.toLowerCase() < b.firstName.toLowerCase()) {
        return -1
      } else {
        return a.firstName.toLowerCase() > b.firstName.toLowerCase() ? 1 : 0
      }
    })
}

function convertLinkedInToNudjPerson (person) {
  return {
    email: get(person, 'Email Address', get(person, 'EmailAddress', '')),
    firstName: get(person, 'First Name', get(person, 'FirstName', '')),
    lastName: get(person, 'Last Name', get(person, 'LastName', '')),
    title: get(person, 'Position'),
    company: get(person, 'Company')
  }
}

module.exports.upload = () => (dispatch, getState) => {
  const state = getState()
  const connections = state.importPage.connections
  const url = '/connections/import'
  const method = 'post'
  const data = { connections }
  dispatch(actions.app.postData({ url, data, method }))
}
