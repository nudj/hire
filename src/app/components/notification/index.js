const React = require('react')
const { css } = require('@nudj/components/styles')

const style = require('./style.css')

const Notification = ({ notification: { type, hide, message } }) => {
  const showNotification = !!type && !hide

  return showNotification && (
    <div className={css([style.root, style[type], style.visible])}>
      <div className={css(style.message)}>{message || ''}</div>
    </div>
  )
}

Notification.defaultProps = {
  notification: {}
}

module.exports = Notification
