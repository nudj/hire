const React = require('react')
const { Link } = require('react-router-dom')
const { Icon, Text } = require('@nudj/components')
const { css } = require('@nudj/components/styles')

const style = require('./style.css')

const MessagePreview = ({
  recipient,
  subject,
  body,
  unread,
  href
}) => (
  <Link nonsensitive className={css(style.root)} to={href}>
    <div className={css(style.centerContainer)}>
      <Text style={[style.recipient, unread && style.unreadText]} element='div' size='largeI'>
        {recipient}
      </Text>
      { subject && (
        <Text style={[style.subject, unread && style.unreadText]} element='div' size='smallI'>
          {subject}
        </Text>
      ) }
      { body && (
        <Text style={[style.body, unread && style.unreadText]} element='div' size='smallIi'>
          {body}
        </Text>
      ) }
    </div>
    <div className={css(style.rightContainer)}>
      <Icon name='chevron' style={style.chevron} />
    </div>
  </Link>
)

module.exports = MessagePreview
