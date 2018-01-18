const React = require('react')
const { Helmet } = require('react-helmet')
const { format } = require('date-fns')
const get = require('lodash/get')
const isNil = require('lodash/isNil')

const {
  Button,
  Card,
  Link,
  Modal,
  Text,
  Textarea
} = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')

const { emailPreferences } = require('../../../lib/constants')
const Layout = require('../../../components/app-layout')
const ButtonLink = require('../../../components/button-link')
const ThreadItem = require('../../../components/email')
const sharedStyle = require('../../shared.css')
const style = require('./style.css')

const MessageThreadPage = props => {
  const { conversation, emailPreference } = props.user
  const { recipient, newMessage } = conversation
  const messages = get(conversation, 'messages', [])
  const csrfToken = get(props, 'csrfToken')

  const fullThread = [...messages, newMessage]
    .filter(message => !isNil(message))
    .filter(message => !isNil(message.body))

  const subject =
    conversation.type === emailPreferences.GOOGLE
      ? conversation.subject
      : 'Unable to display messages'

  return (
    <Layout {...props} styleSheet={{ root: sharedStyle.root }}>
      <Helmet>
        <title>{subject}</title>
      </Helmet>
      <div className={css(sharedStyle.wrapper)}>
        <Card style={[sharedStyle.card, sharedStyle.noPadding]}>
          <div className={css(style.threadSection)}>
            <Text style={style.threadSubject} element="div" size="largeI">
              {subject}
            </Text>
            <Text style={style.threadName} element="div" size="smallI">
              {recipient.firstName} {recipient.lastName}
            </Text>
            <Text style={style.threadEmail} element="div" size="smallIi">
              {recipient.email}
            </Text>
          </div>
          {fullThread.length > 0 &&
            fullThread.map(message => (
              <div className={css(style.threadSection)} key={message.id}>
                <ThreadItem
                  from={`${message.from.firstName} ${message.from.lastName} <${
                    message.from.email
                  }>`}
                  body={message.body}
                  date={format(message.date, 'DD MMM YY HH:mm')}
                />
              </div>
            ))}
          <form className={css(style.threadSection)} method="post">
            <Textarea name="body" placeholder="Write your message here..." />
            <input name="_csrf" value={csrfToken} type="hidden" />
            <Button style={style.replyButton} type="submit" volume="cheer">
              Reply
            </Button>
          </form>
        </Card>
      </div>
    </Layout>
  )
}

module.exports = MessageThreadPage