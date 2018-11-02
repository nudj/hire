const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')
const isNil = require('lodash/isNil')

const { Button, Card, Text } = require('@nudj/components')
const { css, mss } = require('@nudj/components/styles')

const { emailPreferences, GOOGLE_MAILER_DAEMON_ADDRESS } = require('../../lib/constants')
const getPersonOrConnectionName = require('../../lib/get-person-or-connection-names')
const Layout = require('../../components/app-layout')
const MessagePreview = require('../../components/message-preview')
const ButtonLink = require('../../components/button-link')

const Main = require('../../components/main')
const Section = require('../../components/section')
const Small = require('../../components/small')
const TitleCard = require('../../components/title-card')
const { Heading, Para } = require('../../components/app')

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
      <Main>
        { emailPreference !== emailPreferences.OTHER && !isNil(emailPreference)
          ? syncedConversations.length > 0 ? (
            <Section>
              <TitleCard
                title='Messages'
              >
                <Text element='p' style={style.descriptionParagraph}>
                  Keep track and respond to any messages from referrers or candidates in one place without them getting lost in your inbox.
                </Text>
              </TitleCard>
              <Card style={[mss.pa0, mss.ofHide, mss.mtReg]}>
                <ol className={css(style.list)}>
                  {syncedConversations.map(conversation => {
                    const { id, message, subject, recipient } = conversation
                    const { body } = message
                    const { firstName, lastName } = getPersonOrConnectionName(recipient)

                    return (
                      <li className={css(style.listItem)} key={id}>
                        <MessagePreview
                          subject={subject}
                          body={
                            message.from.email === GOOGLE_MAILER_DAEMON_ADDRESS
                              ? 'Google was unable to send your previous message. Most likely because the recipient email address is invalid. Get in touch if you have further questions.'
                              : body
                          }
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
                  nonsensitive
                  href='/contacts'
                  style={mss.mtLgI}
                  name='emailProvider'
                  volume='cheer'
                  subtle
                >
                  Start a new conversation
                </ButtonLink>
              </div>
            </Section>
          ) : (
            <Section width='largeI' padding>
              <Heading nonsensitive level={1} style={mss.fgPrimary}>
                You haven&apos;t sent any messages
              </Heading>
              <Para nonsensitive>
                To get candidates you need to nudj someone. After all, those jobs aren&apos;t going
                to fill themselves.
              </Para>
              <div className={css(mss.center)}>
                <ButtonLink
                  nonsensitive
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
            <div className={css(style.betaFeature)}>
              <span className={css(style.betaTag)}>Beta</span>
            </div>
            <form method='post' action='/sync-google'>
              <Heading nonsensitive level={1} style={mss.fgPrimary}>
                Keep track of all the messages you send
              </Heading>
              <Para nonsensitive>
                If you want to view and reply to messages you&apos;ve sent via Gmail,
                all you need to do is sync your account.
              </Para>
              <Para nonsensitive>
                Then every time you message someone using Gmail, it will show up here.
              </Para>
              <input name='_csrf' value={csrfToken} type='hidden' />
              <div className={css(mss.center)}>
                <Button
                  nonsensitive
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
            <Small style={mss.mtReg}>
              Other email providers coming soon.
            </Small>
          </Section>
        )}
      </Main>
    </Layout>
  )
}

module.exports = MessagesPage
