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
    console.log('info', 'Fetching page', url)
    request(url)
      .then((data) => {
        console.log('info', 'Fetched page', data.page)
        return dispatch(fetchedPage(data.page))
      })
  }
}
