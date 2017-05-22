const {
  replace,
  push
} = require('@nudj/react-router-redux')
const request = require('../../lib/request')
const { merge } = require('../lib')

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
  data
}) => {
  return (dispatch, getState) => {
    let state = getState()
    request(url, {
      method: 'post',
      maxRedirects: 0,
      data: merge(data, {
        _csrf: state.page.csrfToken
      })
    })
    .then((data) => {
      if (data.redirect) {
        // This only supports redirects within our application for now.
        // We will need more intelligent url grokking in order to handle redirects to external urls
        // context.router.history.replace('/' + data.redirect.split('/').slice(3).join('/'))
        dispatch(replace('/' + data.redirect.split('/').slice(3).join('/')))
      } else {
        // when no redirect prop is found we should treat the response as new state data for the form's action page
        // so first set the new page data
        dispatch(fetchedPage(data))
        // then transition to the new page
        dispatch(push(url))
      }
    })
  }
}
