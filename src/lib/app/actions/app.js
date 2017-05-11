const request = require('../../lib/request')

const FETCHED_PAGE = 'FETCHED_PAGE'

module.exports.FETCHED_PAGE = FETCHED_PAGE

function fetchedPage (page) {
  return {
    type: FETCHED_PAGE,
    page
  }
}

module.exports.fetchPage = function (url) {
  return (dispatch, getState) => {
    request(url).then((data) => dispatch(fetchedPage(data.page)))
  }
}

module.exports.setPage = function (data) {
  return (dispatch, getState) => {
    dispatch(fetchedPage(data.page))
  }
}
