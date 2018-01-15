// @flow
const React = require('react')
const { Helmet } = require('react-helmet')
const moment = require('moment')

const { Button, Card, Text, Textarea } = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')

const ThreadItem = require('../../../components/email')
const sharedStyle = require('../../shared.css')
const style = require('./style.css')

const conversation = {
  id: '1',
  subject: 'The Batcave',
  thread: [
    {
      id: '1',
      sent: new Date(),
      body: 'No use, Joker! I knew you\'d employ your sneezing powder, so I took an Anti-Allergy Pill! Instead of a SNEEZE, I\'ve caught YOU, COLD!',
      recipient: {
        firstName: 'Bat',
        lastName: 'Man',
        email: 'batman@batcave.tld'
      }
    },
    {
      id: '2',
      sent: new Date(),
      body: 'No use, Joker! I knew you\'d employ your sneezing powder, so I took an Anti-Allergy Pill! Instead of a SNEEZE, I\'ve caught YOU, COLD!',
      recipient: {
        firstName: 'Bat',
        lastName: 'Man',
        email: 'batman@batcave.tld'
      }
    },
    {
      id: '3',
      sent: new Date(),
      body: 'No use, Joker! I knew you\'d employ your sneezing powder, so I took an Anti-Allergy Pill! Instead of a SNEEZE, I\'ve caught YOU, COLD!',
      recipient: {
        firstName: 'Bat',
        lastName: 'Man',
        email: 'batman@batcave.tld'
      }
    }
  ]
}

const MessageThreadPage = () => (
  <div className={css(sharedStyle.root)}>
    <Helmet>
      <title>
        {'{'}Subject{'}'}
      </title>
    </Helmet>
    <div className={css(sharedStyle.wrapper)}>
      <Card style={[sharedStyle.card, sharedStyle.noPadding]}>
        <div className={css(style.threadSection)}>
          <Text style={style.threadSubject} element="div" size="largeI">
            {conversation.subject}
          </Text>
          <Text style={style.threadName} element="div" size="smallI">
            {conversation.thread[0].recipient.firstName} {conversation.thread[0].recipient.lastName}
          </Text>
          <Text style={style.threadEmail} element="div" size="smallIi">
            {conversation.thread[0].recipient.email}
          </Text>
        </div>
        {conversation.thread.map(message => (
          <div className={css(style.threadSection)} key={message.id}>
            <ThreadItem
              to={`${message.recipient.firstName} ${
                message.recipient.lastName
              } <${message.recipient.email}>`}
              body={message.body}
              date={moment(message.sent).format('DD MMM YY HH:mm')}
            />
          </div>
        ))}
        <form className={css(style.threadSection)} method="post">
          <Textarea placeholder='Write your message here...' />
          <Button style={style.replyButton} type='submit' volume='cheer'>Reply</Button>
        </form>
      </Card>
    </div>
  </div>
)

module.exports = MessageThreadPage
