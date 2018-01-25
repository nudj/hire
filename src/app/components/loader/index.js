const React = require('react')
const { css } = require('@nudj/components/lib/css')
const { Text } = require('@nudj/components')

const style = require('./style.css')

class Loader extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      initialMessage: props.message,
      elipsisChars: '',
      tooLong: false,
      interval: null,
      timeout: null
    }
  }

  componentDidMount () {
    const timeout = setTimeout(() => {
      this.setState({ tooLong: true })
    }, this.props.threshold)
    this.setState({ timeout })
  }

  componentWillUnmount () {
    if (this.state.timeout) {
      clearInterval(this.state.timeout)
    }
  }

  render () {
    const { tooLong, initialMessage } = this.state
    const { tooLongMessage, elipsis } = this.props
    const message = tooLong ? tooLongMessage : initialMessage

    return (
      <div className={css(style.root)}>
        <div className={css(style.body)}>
          <div className={css(style.spinner)} />
          <Text element='div' size='largeI' style={style.message}>
            {message}
            {elipsis && (
              <span className={css(style.elipsis)}>
                <div className={css(style.elipsisDot, style.dotOne)} />
                <div className={css(style.elipsisDot, style.dotTwo)} />
                <div className={css(style.elipsisDot)} />
              </span>
            )}
          </Text>
        </div>
      </div>
    )
  }
}

module.exports = Loader
