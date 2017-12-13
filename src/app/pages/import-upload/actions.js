const get = require('lodash/get')
const actions = require('@nudj/framework/actions')
const Papa = require('../../lib/papa')
const { linkedinToNudjPeople } = require('../../lib/linkedin-to-nudj')

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

const parse = file => async (dispatch, getState) => {
  dispatch(setValue('parsing', true))

  try {
    const result = await Papa.asyncParse(file, {
      header: true,
      dynamicTyping: true
    })
    const data = get(result, 'data', [])
    const connections = linkedinToNudjPeople(data)
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
