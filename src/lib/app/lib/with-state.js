const React = require('react')
const { withRouter } = require('react-router-dom')
const { connect } = require('react-redux')
const ScrollTop = require('../components/scroll-top/scroll-top')

const WithState = (Page) => {
  return withRouter(connect((state, props) => Object.assign({}, state, props))((props) => {
    return <ScrollTop><Page {...props.page} /></ScrollTop>
  }))
}

module.exports = WithState
