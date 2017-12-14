const get = require('lodash/get')
const actions = require('@nudj/framework/actions')

const Papa = require('../../../lib/papa')
const { linkedinToNudjPeople } = require('../../../lib/linkedin-to-nudj')

const START_PARSING_LINKEDIN_CONNECTIONS = 'START_PARSING_LINKEDIN_CONNECTIONS'
const COMPLETE_PARSING_LINKEDIN_CONNECTIONS =
  'COMPLETE_PARSING_LINKEDIN_CONNECTIONS'
const START_CONNECTIONS_UPLOAD = 'START_CONNECTIONS_UPLOAD'
const COMPLETE_CONNECTIONS_UPLOAD = 'COMPLETE_CONNECTIONS_UPLOAD'

const startParsingLinkedinConnections = () => ({
  type: START_PARSING_LINKEDIN_CONNECTIONS
})

const completeParsingLinkedinConnections = connections => ({
  type: COMPLETE_PARSING_LINKEDIN_CONNECTIONS,
  connections
})

const startConnectionsUpload = () => ({
  type: START_CONNECTIONS_UPLOAD
})

const completeConnectionsUpload = () => ({
  type: COMPLETE_CONNECTIONS_UPLOAD
})

const parseLinkedinConnections = file => async dispatch => {
  dispatch(startParsingLinkedinConnections())

  try {
    const result = await Papa.asyncParse(file, {
      header: true,
      dynamicTyping: true
    })
    const data = get(result, 'data', [])
    const connections = linkedinToNudjPeople(data)
    return dispatch(completeParsingLinkedinConnections(connections))
  } catch (e) {
    throw new Error(e)
  }
}

const uploadLinkedinConnections = () => async (dispatch, getState) => {
  dispatch(startConnectionsUpload())

  try {
    const url = '/setup-network/linkedin/upload'
    const method = 'post'
    const data = {
      connections: getState().uploadPage.connections,
      source: 'linkedin'
    }

    dispatch(
      actions.app.postData({
        url,
        method,
        data
      })
    )
    dispatch(completeConnectionsUpload())
  } catch (e) {
    throw new Error(e)
  }
}

module.exports = {
  // constants
  START_PARSING_LINKEDIN_CONNECTIONS,
  COMPLETE_PARSING_LINKEDIN_CONNECTIONS,
  START_CONNECTIONS_UPLOAD,
  COMPLETE_CONNECTIONS_UPLOAD,
  // action creators
  startParsingLinkedinConnections,
  completeParsingLinkedinConnections,
  startConnectionsUpload,
  completeConnectionsUpload,
  parseLinkedinConnections,
  uploadLinkedinConnections
}
