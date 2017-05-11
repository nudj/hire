const React = require('react')
const PropTypes = require('prop-types')
const { connect } = require('react-redux')
const serialise = require('form-serialize')
const request = require('../../../lib/request')

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
        return context.router.history.replace('/' + data.redirect.split('/').slice(3).join('/'))
      } else {
        // when no redirect prop is found we should treat the response as new state data for the current page
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
