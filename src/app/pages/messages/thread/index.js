const React = require('react')
const { Helmet } = require('react-helmet')
const { format } = require('date-fns')
const get = require('lodash/get')
const isNil = require('lodash/isNil')

const { Button, Card, Link, Modal, Text, Textarea } = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')
const {
  values: emailPreferences
} = require('@nudj/api/gql/schema/enums/email-preference-types')

const Layout = require('../../../components/app-layout')
const ButtonLink = require('../../../components/button-link')
const ThreadItem = require('../../../components/email')
const sharedStyle = require('../../shared.css')
const style = require('./style.css')

const MessageThreadPage = props => {
  const conversation = get(props, 'user.conversation')
  const { recipient, newMessage } = conversation
  const messages = get(conversation, 'messages', [])
  const csrfToken = get(props, 'csrfToken')

  const fullThread = [...messages, newMessage].filter(message => !isNil(message))

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
          {fullThread.map(message => (
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
      <Modal isOpen={conversation.type !== emailPreferences.GOOGLE}>
        <Text element="div" size="largeIi" style={sharedStyle.heading}>
          worth nudj’ing within your network
        </Text>
        <Text element="p" style={sharedStyle.subheading}>
          As you’ve not sent this email via Gmail, you can’t view any messages sent or recieved from this person.
        </Text>
        <Text element="p" style={sharedStyle.subheading}>
          If you use a different email provider check if it’s on our <Link href="https://nudj.canny.io/product-roadmap" target="_blank" inline sutble volume="shout">roadmap</Link>. Alterntivelty sync your gmail account now.
        </Text>
        <form method='post' action='/survey-complete'>
          <input name='_csrf' value={csrfToken} type='hidden' />
          <ButtonLink href="/messages">Back</ButtonLink>
          <Button
            name='emailProvider'
            type='submit'
            value={emailPreferences.GOOGLE}
            volume='cheer'
          >
            Sync account
          </Button>
        </form>
      </Modal>
    </Layout>
  )
}

module.exports = MessageThreadPage
