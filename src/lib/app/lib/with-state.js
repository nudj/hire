const React = require('react')
const { withRouter } = require('react-router-dom')
const { connect } = require('react-redux')
const get = require('lodash/get')
const ScrollTop = require('../components/scroll-top/scroll-top')
const ErrorPage = require('../components/error-page/error-page')
const Status = require('../components/status/status')
const Loading = require('../components/loading/loading')

const withState = (callback) => {
  return withRouter(connect((state, props) => Object.assign({}, state, props))(callback))
}

const WithState = (Component) => {
  return withState((props) => {
    return <Component dispatch={props.dispatch} {...props.app} />
  })
}

const PageWithState = (Page) => {
  return withState((props) => {
    let page
    switch (true) {
      case !!get(props, 'app.error'):
        page = (
          <Status code={get(props, 'app.error.code')}>
            <ErrorPage {...props.app.error} />
          </Status>
        )
        break
      case !!get(props, 'app.loading'):
        page = <Loading />
        break
      default:
        page = <ScrollTop ignore={props.history.action === 'REPLACE'}><Page dispatch={props.dispatch} {...props.app} page={props.page} /></ScrollTop>
    }
    return page
  })
}

module.exports = {
  PageWithState,
  WithState
}
