const get = require('lodash/get')
const actions = require('@nudj/framework/actions')

const { dataSources } = require('../../lib/constants')
const Papa = require('../../lib/papa')

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
    return dispatch(completeParsingLinkedinConnections(data))
  } catch (error) {
    throw new Error(error)
  }
}

const uploadLinkedinConnections = () => async (dispatch, getState) => {
  dispatch(startConnectionsUpload())

  try {
    const url = '/setup-network/linkedin/upload'
    const method = 'post'
    const data = {
      connections: getState().uploadLinkedinConnectionsPage.connections,
      source: dataSources.LINKEDIN
    }
    await dispatch(
      actions.app.postData({
        url,
        method,
        data,
        showLoadingState: false
      })
    )
    dispatch(completeConnectionsUpload())
  } catch (error) {
    throw new Error(error)
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
