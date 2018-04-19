const React = require('react')

const formatTime = (totalSeconds) => {
  let hours = Math.floor(totalSeconds / 3600);
  let minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
  let seconds = totalSeconds - (hours * 3600) - (minutes * 60);

  // round seconds
  seconds = Math.floor(Math.round(seconds * 100) / 100);

  let result = (hours < 10 ? "0" + hours : hours);
  result += ":" + (minutes < 10 ? "0" + minutes : minutes);
  result += ":" + (seconds < 10 ? "0" + seconds : seconds);
  return result;
}

module.exports = class Countdown extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      clock: props.startTime
    }
  }

  componentDidMount() {
    this.startTimer()
  }

  componentWillUnmount() {
    this.pauseTimer()
  }

  updateTimer = () => {
    const { onFinish } = this.props
    const { clock } = this.state
    if (clock <= 0) return

    const newClock = clock - this.calculateTimeOffset();

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
      this.offset = Date.now();
      this.interval = setInterval(this.updateTimer, 1000);
    }
  };

  pauseTimer = () => {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  };

  calculateTimeOffset = () => {
    const now = Date.now();
    const newOffset = now - this.offset;
    this.offset = now;
    return newOffset;
  };

  render() {
    const { onComplete, ...rest } = this.props
    const { clock } = this.state
    const time = formatTime(clock / 1000)

    return <span {...rest}>{time}</span>
  }
}
