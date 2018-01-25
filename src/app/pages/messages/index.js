const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')
const isNil = require('lodash/isNil')

const { Button, Card } = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')
const mss = require('@nudj/components/lib/css/modifiers.css')

const { emailPreferences } = require('../../lib/constants')
const Layout = require('../../components/app-layout')
const MessagePreview = require('../../components/message-preview')
const ButtonLink = require('../../components/button-link')

const Wrapper = require('../../components/wrapper')
const Section = require('../../components/section')
const { Heading, P } = require('../../components/app')

const style = require('./style.css')

const MessagesPage = props => {
  const { user, csrfToken } = props
  const { emailPreference } = user
  const conversations = get(user, 'conversations', [])

  const syncedConversations = conversations.filter(
    conversation => conversation.type !== emailPreferences.OTHER
  )

  return (
    <Layout {...props}>
      <Helmet>
        <title>Messages</title>
      </Helmet>
      <Wrapper>
        { emailPreference !== emailPreferences.OTHER && !isNil(emailPreference)
          ? syncedConversations.length > 0 ? (
            <Section width='largeI'>
              <Heading level={1} style={[mss.plReg, mss.mrReg, mss.fgPrimary]}>
                All messages
              </Heading>
              <Card style={[mss.pa0, mss.mtReg, mss.ofHide]}>
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
              <div className={css(mss.center, mss.plReg, mss.prReg)}>
                <ButtonLink
                  href='/contacts'
                  style={mss.mtLgI}
                  name='emailProvider'
                  volume='cheer'
                  subtle
                >
                  Start new conversation
                </ButtonLink>
              </div>
            </Section>
          ) : (
            <Section width='largeI' padding>
              <Heading level={1} style={mss.fgPrimary}>
                You haven’t sent any messages
              </Heading>
              <P>
                To get candidates you need to send out some requests. After all, those jobs aren’t going to fill themselves.
              </P>
              <div className={css(mss.center)}>
                <ButtonLink
                  href='/contacts'
                  style={mss.mtLgI}
                  name='emailProvider'
                  volume='cheer'
                  subtle
                >
                  Start a conversation
                </ButtonLink>
              </div>
            </Section>
          )
        : (
          <Section padding>
            <form method='post' action='/sync-google'>
              <Heading level={1} style={mss.fgPrimary}>
                Keeping track of your messages
              </Heading>
              <P>
                If you’ve sent messages using something other than Gmail, we can’t
                display themss.
              </P>
              <P>
                We recommend syncing with Gmail, which will ensure you can track
                all your messages going forward. If however, you'd like to use a
                different email provider then let us know.
              </P>
              <input name='_csrf' value={csrfToken} type='hidden' />
              <div className={css(mss.center)}>
                <Button
                  style={mss.mtLgI}
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
          </Section>
        )}
      </Wrapper>
    </Layout>
  )
}

module.exports = MessagesPage
