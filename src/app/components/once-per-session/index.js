const React = require('react')

const OncePerSession = (id, Component) => class extends React.Component {
  state = {
    shouldRender: false
  }

  componentDidMount () {
    if (!window.sessionStorage.getItem(id)) {
      this.setState({
        shouldRender: true
      })
    }
  }

  handleClose = () => {
    const { onClose } = this.props

    this.setState({
      shouldRender: false
    }, onClose)

    window.sessionStorage.setItem(id, false)
  }

  render () {
    const { shouldRender } = this.state

    if (!shouldRender) return null

    return <Component close={this.handleClose} {...this.props} />
  }
}

module.exports = OncePerSession
