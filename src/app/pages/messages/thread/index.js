const React = require('react')
const { Helmet } = require('react-helmet')
const { format } = require('date-fns')
const get = require('lodash/get')
const isNil = require('lodash/isNil')

const { Button, Card, Text, Textarea } = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')
const mss = require('@nudj/components/lib/css/modifiers.css')

const { emailPreferences, GOOGLE_MAILER_DAEMON_ADDRESS } = require('../../../lib/constants')
const Layout = require('../../../components/app-layout')
const ThreadItem = require('../../../components/email')
const Main = require('../../../components/main')
const Section = require('../../../components/section')
const style = require('./style.css')

const MessageThreadPage = props => {
  const { conversation } = props.user
  const { recipient, newMessage } = conversation
  const asAConnection = get(recipient, 'asAConnection')

  const firstName = recipient.firstName || asAConnection.firstName
  const lastName = recipient.lastName || asAConnection.lastName

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
    <Layout {...props}>
      <Helmet>
        <title>{subject}</title>
      </Helmet>
      <Main>
        <Section width='largeI'>
          <Card style={mss.pa0}>
            <div className={css(style.threadSection)}>
              <Text style={style.threadSubject} element='div' size='largeI'>
                {subject}
              </Text>
              <Text style={style.threadName} element='div' size='smallI'>
                {firstName} {lastName}
              </Text>
              <Text style={style.threadEmail} element='div' size='smallIi'>
                {recipient.email}
              </Text>
            </div>
            {fullThread.length > 0 &&
              fullThread.map(message => {
                if (message.from.email === GOOGLE_MAILER_DAEMON_ADDRESS) {
                  return (
                    <Text element='div' style={style.threadSection} key={message.id}>
                      Google was unable to send your previous message. Most likely because the recipient email address is invalid. Get in touch if you have further questions.
                    </Text>
                  )
                }

                const messageFirstName = message.from.firstName || message.from.asAConnection.firstName
                const messageLastName = message.from.lastName || message.from.asAConnection.lastName

                return (
                  <div className={css(style.threadSection)} key={message.id}>
                    <ThreadItem
                      from={`${messageFirstName} ${
                        messageLastName
                      } <${message.from.email}>`}
                      body={message.body}
                      date={format(message.date, 'DD MMM YY HH:mm')}
                    />
                  </div>
                )
              })}
            <form className={css(style.threadSection)} method='post'>
              <Textarea name='body' placeholder='Write your message here...' />
              <input name='_csrf' value={csrfToken} type='hidden' />
              <Button style={style.replyButton} type='submit' volume='cheer'>
                Reply
              </Button>
            </form>
          </Card>
        </Section>
      </Main>
    </Layout>
  )
}

module.exports = MessageThreadPage
