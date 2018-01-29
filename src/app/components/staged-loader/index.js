const React = require('react')
const { css } = require('@nudj/components/lib/css')

const style = require('./style.css')

class Loader extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      stage: 0,
      interval: null,
      showEndMessage: false,
      endMessageTimeout: null
    }
  }

  componentDidMount () {
    const interval = setInterval(() => {
      this.setState(({ stage }) => ({
        stage: stage + 1
      }))
    }, this.props.threshold)

    const endMessageTimeout = setTimeout(() => {
      this.setState({
        showEndMessage: true
      })
    }, 180000)

    this.setState({ interval, endMessageTimeout })
  }

  componentWillUnmount () {
    if (this.state.interval) {
      clearInterval(this.state.interval)
    }

    if (this.state.endMessageTimeout) {
      clearTimeout(this.state.endMessageTimeout)
    }
  }

  getMessage = () => {
    const { messages } = this.props
    const { stage } = this.state

    if (stage >= messages.length) {
      return messages[messages.length - 1]
    }

    return messages[stage]
  }

  render () {
    const { showEndMessage } = this.state
    const { ellipsis } = this.props

    const message = this.getMessage()

    return (
      <span style={style.message}>
        {showEndMessage ? 'Reticulating splines' : message}
        {ellipsis && (
          <span className={css(style.ellipsis)}>
            <div className={css(style.ellipsisDot, style.dotOne)} />
            <div className={css(style.ellipsisDot, style.dotTwo)} />
            <div className={css(style.ellipsisDot)} />
          </span>
        )}
      </span>
    )
  }
}

module.exports = Loader
