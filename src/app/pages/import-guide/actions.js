const PREFIX = 'IMPORT'

const SET_ACTIVE = `${PREFIX}_SET_ACTIVE`
module.exports.SET_ACTIVE = SET_ACTIVE
function setActive (active) {
  return {
    type: SET_ACTIVE,
    active
  }
}

module.exports.setActive = active => (dispatch, getState) => {
  return dispatch(setActive(active))
}
