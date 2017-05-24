const { push } = require('@nudj/react-router-redux')
const request = require('../../lib/request')
const { merge } = require('../../lib')

const FETCHED_PAGE = 'FETCHED_PAGE'
module.exports.FETCHED_PAGE = FETCHED_PAGE
function fetchedPage (data) {
  return {
    type: FETCHED_PAGE,
    data
  }
}
module.exports.setPage = (data) => {
  return (dispatch, getState) => {
    dispatch(fetchedPage(data))
  }
}

const SHOW_DIALOG = 'SHOW_DIALOG'
module.exports.SHOW_DIALOG = SHOW_DIALOG
function showDialog (dialog) {
  return {
    type: SHOW_DIALOG,
    dialog
  }
}
module.exports.showDialog = (dialog) => {
  return (dispatch, getState) => {
    dispatch(showDialog(dialog))
  }
}

const HIDE_DIALOG = 'HIDE_DIALOG'
module.exports.HIDE_DIALOG = HIDE_DIALOG
function hideDialog () {
  return {
    type: HIDE_DIALOG
  }
}
module.exports.hideDialog = () => {
  return (dispatch, getState) => {
    dispatch(hideDialog())
  }
}

module.exports.postData = ({
  url,
  method = 'post',
  data
}) => {
  return (dispatch, getState) => {
    let state = getState()
    request(url, {
      method,
      data: merge(data, {
        _csrf: state.page.csrfToken
      })
    })
    .then((data) => {
      dispatch(fetchedPage(data))
      dispatch(push(data.page.url.originalUrl))
    })
  }
}
