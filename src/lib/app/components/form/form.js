const React = require('react')
const PropTypes = require('prop-types')
const { connect } = require('react-redux')
const serialise = require('form-serialize')
const request = require('../../../lib/request')
const { setPage } = require('../../actions/app')

function getSubmitHandler (props, context) {
  return (event) => {
    event.preventDefault()
    let data = serialise(event.target, { hash: true })
    props.onSubmit && props.onSubmit(event)
    request(props.action, {
      method: props.method,
      maxRedirects: 0,
      data
    })
    .then((data) => {
      if (data.redirect) {
        // This only supports redirects within our application for now.
        // We will need more intelligent url grokking in order to handle redirects to external urls
        context.router.history.replace('/' + data.redirect.split('/').slice(3).join('/'))
      } else {
        // when no redirect prop is found we should treat the response as new state data for the form's action page
        // so first set the new page data
        props.dispatch(setPage(data))
        // then transition to the new page
        context.router.history.push(props.action)
        return data
      }
    })
  }
}

const Form = (props, context) => {
  return <form action={props.action} method={props.method || 'post'} onSubmit={getSubmitHandler(props, context)}>
    {props.children}
  </form>
}
Form.contextTypes = {
  router: PropTypes.shape({
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
      replace: PropTypes.func.isRequired,
      createHref: PropTypes.func.isRequired
    }).isRequired
  }).isRequired
}

module.exports = connect()(Form)
