const React = require('react')

const Tooltip = require('../tooltip/tooltip')

const getStyle = require('./compose-external-page.css')
// const PrismicReact = require('../../lib/prismic-react')

module.exports = class ComposePage extends React.Component {
  constructor (props) {
    super(props)
    this.style = getStyle()

    const messages = props.messages
    const tooltips = props.tooltips

    this.state = {messages, tooltips}
    // recipients: props.recipients
  }

  renderTooltip () {
    // const tooltip = new PrismicReact(this.state.tooltips[0])
    const tooltip = this.state.tooltips[0]
    const props = {tooltip}
    return (<Tooltip {...props} />)
  }

  // renderMessage () {
  //   const message = new PrismicReact(this.state.messages[0])
  //   const props = {message}
  //   return (<Message {...props} />)
  // }

  render () {
    return (
      <div>
        {this.renderTooltip()}
      </div>
    )
  }
}
