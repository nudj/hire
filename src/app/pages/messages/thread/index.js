const React = require('react')
const { Helmet } = require('react-helmet')
const { format } = require('date-fns')
const get = require('lodash/get')

const { Button, Card, Text, Textarea } = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')
const {
  values: emailPreferences
} = require('@nudj/api/gql/schema/enums/email-preference-types')

const ThreadItem = require('../../../components/email')
const sharedStyle = require('../../shared.css')
const style = require('./style.css')

// const conversation = {
//   id: '1',
//   subject: 'The Batcave',
//   thread: [
//     {
//       id: '1',
//       sent: new Date(),
//       body: 'No use, Joker! I knew you\'d employ your sneezing powder, so I took an Anti-Allergy Pill! Instead of a SNEEZE, I\'ve caught YOU, COLD!',
//       recipient: {
//         firstName: 'Bat',
//         lastName: 'Man',
//         email: 'batman@batcave.tld'
//       }
//     },
//     {
//       id: '2',
//       sent: new Date(),
//       body: 'No use, Joker! I knew you\'d employ your sneezing powder, so I took an Anti-Allergy Pill! Instead of a SNEEZE, I\'ve caught YOU, COLD!',
//       recipient: {
//         firstName: 'Bat',
//         lastName: 'Man',
//         email: 'batman@batcave.tld'
//       }
//     },
//     {
//       id: '3',
//       sent: new Date(),
//       body: 'No use, Joker! I knew you\'d employ your sneezing powder, so I took an Anti-Allergy Pill! Instead of a SNEEZE, I\'ve caught YOU, COLD!',
//       recipient: {
//         firstName: 'Bat',
//         lastName: 'Man',
//         email: 'batman@batcave.tld'
//       }
//     }
//   ]
// }

const MessageThreadPage = props => {
  const conversation = get(props, 'user.conversation')
  const { recipient } = conversation
  const messages = get(props, 'user.conversation.messages', [])

  const subject =
    conversation.type === emailPreferences.GOOGLE
      ? conversation.subject
      : 'Unable to display messages'

  return (
    <div className={css(sharedStyle.root)}>
      <Helmet>
        <title>
          { subject } 
        </title>
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
          {messages.map(message => (
            <div className={css(style.threadSection)} key={message.id}>
              <ThreadItem
                from={`${message.from.firstName} ${
                  message.from.lastName
                } <${message.from.email}>`}
                body={message.body}
                date={format(message.date, 'DD MMM YY HH:mm')}
              />
            </div>
          ))}
          <form className={css(style.threadSection)} method="post">
            <Textarea name='body' placeholder='Write your message here...' />
            <Button style={style.replyButton} type='submit' volume='cheer'>Reply</Button>
          </form>
        </Card>
      </div>
    </div>
  )
}

module.exports = MessageThreadPage
