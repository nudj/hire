const React = require('react')

module.exports = class ScrollTop extends React.Component {
  constructor (props) {
    super(props)
  }
  componentDidMount () {
    window.scroll(0,0)
  }
  render () {
    return this.props.children
  }
}
