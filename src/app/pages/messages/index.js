const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')
const isNil = require('lodash/isNil')

const { Button, Card, Text } = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')

const { emailPreferences } = require('../../lib/constants')
const Layout = require('../../components/app-layout')
const MessagePreview = require('../../components/message-preview')
const ButtonLink = require('../../components/button-link')
const sharedStyle = require('../shared.css')
const style = require('./style.css')

const MessagesPage = props => {
  const { user, csrfToken } = props
  const { emailPreference } = user
  const conversations = get(user, 'conversations', [])

  const syncedConversations = conversations.filter(
    conversation => conversation.type !== emailPreferences.OTHER
  )

  return (
    <Layout {...props} styleSheet={{ root: sharedStyle.root }}>
      <Helmet>
        <title>Your messages</title>
      </Helmet>
      <div className={css(sharedStyle.wrapper)}>
        { emailPreference !== emailPreferences.OTHER && !isNil(emailPreference) ? (
          <div>
            {syncedConversations.length > 0 ? (
              <Card style={[sharedStyle.card, sharedStyle.noPadding, style.card, style.section]}>
                <ol className={css(style.list)}>
                  {syncedConversations.map(conversation => {
                    const { id, message, subject, recipient } = conversation
                    const { firstName, lastName } = recipient
                    const { body } = message

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
            ) : (
              <div className={css(style.section)}>
                <Text element='p' size='largeI' style={sharedStyle.heading}>
                  You haven’t sent any messages
                </Text>
                <Text element='p' style={sharedStyle.subheading}>
                  To get candidates you need to send out some requests. After all, those jobs aren’t going to fill themselves. 
                </Text>
                <div className={css(style.buttonGroup)}>
                  <ButtonLink
                    href='/contacts'
                    style={style.button}
                    name='emailProvider'
                    volume='cheer'
                    subtle
                  >
                    Start a conversation
                  </ButtonLink>
                </div>
              </div>
            ) }
          </div>
        ) : ( 
          <form method='post' action='/sync-google' className={css(style.section)}>
            <Text element='p' size='largeI' style={sharedStyle.heading}>
              Keeping track of your messages
            </Text>
            <Text element='p' style={sharedStyle.subheading}>
              If you’ve sent messages using something other than Gmail, we can’t
              display them.
            </Text>
            <Text element='p' style={sharedStyle.subheading}>
              We recommend syncing with Gmail, which will ensure you can track
              all your messages going forward. If however, you'd like to use a
              different email provider then let us know.
            </Text>
            <input name='_csrf' value={csrfToken} type='hidden' />
            <div className={css(style.buttonGroup)}>
              <Button
                style={style.button}
                name='emailProvider'
                type='submit'
                value={emailPreferences.GOOGLE}
                volume='cheer'
                subtle
              >
                Sync with Gmail
              </Button>
            </div>
          </form>
        )}
      </div>
    </Layout>
  )
}

module.exports = MessagesPage
