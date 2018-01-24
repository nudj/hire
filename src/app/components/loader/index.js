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
      interval: null
    }
  }

  componentDidMount () {
    setTimeout(() => {
      this.setState({ tooLong: true })
    }, this.props.threshold)

    if (this.props.elipsis) {
      const interval = setInterval(() => {
        if (this.state.elipsisChars === '...') {
          this.setState({ elipsisChars: '.' })
        } else {
          this.setState({ elipsisChars: `${this.state.elipsisChars}.` })
        }
      }, this.props.elipsisSpeed || 500)
      this.setState({ interval })
    }
  }

  componentWillUnmount () {
    if (this.state.interval) {
      clearInterval(this.state.interval)
    }
  }

  render () {
    const { tooLong, initialMessage } = this.state
    const message = tooLong ? this.props.tooLongMessage : initialMessage

    return (
      <div className={css(style.root)}>
        <div className={css(style.body)}>
          <div className={css(style.spinner)} />
          <Text element='div' size='largeI' style={style.message}>
            {message}<span style={{position: 'absolute'}}>{this.state.elipsisChars}</span>
          </Text>
        </div>
      </div>
    )
  }
}

module.exports = Loader
