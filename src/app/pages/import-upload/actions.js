const get = require('lodash/get')
const Papa = require('../../lib/papa')
const actions = require('@nudj/framework/actions')

const PREFIX = 'IMPORT'
const SET_VALUE = `${PREFIX}_SET_VALUE`
const SET_CONNECTIONS = `${PREFIX}_SET_CONNECTIONS`

function setValue (key, value) {
  return {
    type: SET_VALUE,
    key,
    value
  }
}

function setConnections (connections) {
  return {
    type: SET_CONNECTIONS,
    connections
  }
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

const parse = file => async (dispatch, getState) => {
  dispatch(setValue('parsing', true))

  try {
    const result = await Papa.asyncParse(file, {
      header: true,
      dynamicTyping: true
    })
    const data = get(result, 'data', [])
    const connections = convertLinkedInToNudjPeople(data)
    dispatch(setConnections(connections))
  } catch (e) {
    throw new Error('Unable to parse connections')
  }
}

const upload = source => (dispatch, getState) => {
  const state = getState()
  const segment = state.app.user.onboarded ? 'connections' : 'onboarding'
  const connections = state.importUploadPage.connections
  const url = `/${segment}/import/upload`
  const method = 'post'
  const data = { connections, source }
  dispatch(actions.app.postData({ url, data, method }))
}

module.exports = {
  parse,
  upload,
  SET_VALUE,
  SET_CONNECTIONS
}
