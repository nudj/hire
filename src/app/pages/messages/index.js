// @flow
const React = require('react')
const { Helmet } = require('react-helmet')
const { Card } = require('@nudj/components')

const { css } = require('@nudj/components/lib/css')

const MessagePreview = require('../../components/message-preview')
const sharedStyle = require('../shared.css')
const style = require('./style.css')

const messages = [{
  id: '1',
  recipient: 'Batman',
  subject: 'The Batcave',
  body: 'The joker has gained access ⏰',
  unread: true
}, {
  id: '2',
  recipient: 'Team nudj',
  subject: 'Monday',
  body: 'Going to WFH Monday FYI, have to give Thames water access to the flat because of a potential blockage in the main sewer pipe',
  unread: true
}, {
  id: '3',
  recipient: 'Team nudj',
  subject: 'Monday',
  body: 'Going to WFH Monday FYI, have to give Thames water access to the flat because of a potential blockage in the main sewer pipe',
  unread: false
}]

const MessagesPage = () => (
  <div className={css(sharedStyle.root)}>
    <Helmet>
      <title>Your messages</title>
    </Helmet>
    <div className={css(sharedStyle.wrapper)}>
      <Card style={[sharedStyle.card, sharedStyle.noPadding, style.card]}>
        <ol className={css(style.list)}>
          {messages.map(message => (
            <li className={css(style.listItem)} key={message.id}>
              <MessagePreview {...message} href={`/messages/${message.id}`} />
            </li>
          ))}
        </ol>
      </Card>
    </div>
  </div>
)

module.exports = MessagesPage
