const React = require('react')
const { css } = require('@nudj/components/styles')
const { Text } = require('@nudj/components')

const style = require('./style.css')

class Loader extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      thresholdReached: false,
      interval: null,
      timeout: null
    }
  }

  componentDidMount () {
    const timeout = setTimeout(() => {
      this.setState({ thresholdReached: true })
    }, this.props.threshold)
    this.setState({ timeout })
  }

  componentWillUnmount () {
    if (this.state.timeout) {
      clearInterval(this.state.timeout)
    }
  }

  render () {
    const {
      thresholdMessage,
      ellipsis,
      initialMessage,
      style: styleOverride
    } = this.props
    const { thresholdReached } = this.state
    const message = thresholdReached ? thresholdMessage : initialMessage

    return (
      <div className={css(style.root)}>
        <div className={css(style.body, styleOverride)}>
          <div className={css(style.spinner)} />
          <Text element='div' size='largeI' style={style.message}>
            {message}
            {ellipsis && (
              <span className={css(style.ellipsis)}>
                <div className={css(style.ellipsisDot, style.dotOne)} />
                <div className={css(style.ellipsisDot, style.dotTwo)} />
                <div className={css(style.ellipsisDot)} />
              </span>
            )}
          </Text>
        </div>
      </div>
    )
  }
}

module.exports = Loader
