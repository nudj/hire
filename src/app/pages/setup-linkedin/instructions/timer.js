const React = require('react')

module.exports = class Countdown extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      clock: props.startTime
    }
  }

  componentDidMount () {
    this.startTimer()
  }

  componentWillUnmount () {
    this.pauseTimer()
  }

  updateTimer = () => {
    const { onFinish } = this.props
    const { clock } = this.state
    if (clock <= 0) return

    const newClock = clock - this.calculateTimeOffset()

    if (newClock <= 0) {
      this.setState({
        clock: 0
      })

      clearInterval(this.interval)
      onFinish && onFinish()
    } else {
      this.setState({
        clock: newClock
      })
    }
  };

  startTimer = () => {
    if (!this.interval) {
      this.offset = Date.now()
      this.interval = setInterval(this.updateTimer, 1000)
    }
  };

  pauseTimer = () => {
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = null
    }
  };

  calculateTimeOffset = () => {
    const now = Date.now()
    const newOffset = now - this.offset
    this.offset = now
    return newOffset
  };

  render () {
    return null
  }
}
