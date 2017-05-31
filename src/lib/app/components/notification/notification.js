const React = require('react')
const get = require('lodash/get')
const getStyle = require('./notification.css')
const {
  hideNotification,
  showNotification
} = require('../../actions/app')

function onClickClose (props) {
  return (event) => props.dispatch(hideNotification())
}

const Notification = (props) => {
  const style = getStyle()
  const notification = get(props, 'notification')
  const type = get(notification, 'type')
  const typeClass = !!type ? style[type] : ''
  const stateClass = !!notification ? style.visible : ''
  return <div className={`${style.notification} ${typeClass} ${stateClass}`}>
    <div className={style.message}>{get(notification, 'message', '')}</div>
    <button className={style.close} onClick={onClickClose(props)}><img src='/assets/images/close.svg' alt='Close' /></button>
  </div>
}

module.exports = Notification
