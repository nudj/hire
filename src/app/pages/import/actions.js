const PREFIX = 'IMPORT'

const SET_NETWORK = `${PREFIX}_SET_NETWORK`
module.exports.SET_NETWORK = SET_NETWORK
function setNetwork (network) {
  return {
    type: SET_NETWORK,
    network
  }
}

module.exports.setNetwork = network => (dispatch, getState) => {
  return dispatch(setNetwork(network))
}
