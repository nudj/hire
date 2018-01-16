const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')

const { Card } = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')
const {
  values: emailPreferences
} = require('@nudj/api/gql/schema/enums/email-preference-types')

const Layout = require('../../components/app-layout')
const MessagePreview = require('../../components/message-preview')
const sharedStyle = require('../shared.css')
const style = require('./style.css')

const MessagesPage = props => {
  const { user } = props
  const conversations = get(user, 'conversations', [])

  return (
    <Layout {...props} styleSheet={{root: sharedStyle.root}}>
      <Helmet>
        <title>Your messages</title>
      </Helmet>
      <div className={css(sharedStyle.wrapper)}>
        <Card style={[sharedStyle.card, sharedStyle.noPadding, style.card]}>
          <ol className={css(style.list)}>
            {conversations.map(conversation => {
              const { id, message, recipient } = conversation
              const { firstName, lastName } = recipient
              const { body } = message
              const subject =
                conversation.type === emailPreferences.GOOGLE
                  ? conversation.subject
                  : 'Unable to display messages'

              return (
                <li className={css(style.listItem)} key={id}>
                  <MessagePreview
                    subject={subject}
                    body={body}
                    href={`/messages/${id}`}
                    recipient={`${firstName} ${lastName}`}
                  />
                </li>
              )
            })}
          </ol>
        </Card>
      </div>
    </Layout>
  )
}

module.exports = MessagesPage
