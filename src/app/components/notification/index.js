const React = require('react')
const get = require('lodash/get')
const actions = require('@nudj/framework/actions')
const { css } = require('@nudj/components/lib/css')

const style = require('./style.css')

const onClickClose = props => event =>
  props.dispatch(actions.app.hideNotification())

class Notification extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      js: false
    }
  }
  componentDidMount() {
    this.setState({
      js: true
    })
  }
  render() {
    const notification = get(this.props, 'notification')
    const type = get(notification, 'type')
    const show = notification && !get(notification, 'hide')

    return (
      <div className={css([style.root, style[type], show && style.visible])}>
        <div className={css(style.message)}>
          {get(notification, 'message', '')}
        </div>
        {get(this.state, 'js') ? (
          <button
            className={css(style.close)}
            onClick={onClickClose(this.props)}
          >
            <img
              className={css(style.closeIcon)}
              src="/assets/images/close.svg"
              alt="Close"
            />
          </button>
        ) : null}
      </div>
    )
  }
}

module.exports = Notification
