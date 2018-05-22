const React = require('react')

const { Text, Card } = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')

const ButtonLink = require('../../components/button-link')
const Main = require('../../components/main')
const Section = require('../../components/section')
const {
  Heading,
  Para,
  styleSheet: wizardStyles
} = require('../../components/wizard')

const WelcomeTeamMember = ({ style }) => (
  <Main>
    <Section padding>
      <Heading nonsensitive>
        Welcome to nudj
      </Heading>
      <Para nonsensitive>
        Here&apos;s how nudj makes referring someone for a job and getting
        rewarded&nbsp;a&nbsp;doddle.
      </Para>
    </Section>
    <Section>
      <ul className={css(style.list)}>
        <li className={css(style.listItem)}>
          <Card style={style.card}>
            <img
              className={css(style.listItemImage)}
              src='/assets/images/unlock-network.svg'
              alt=''
            />
            <Text nonsensitive element='div' style={style.listItemHeading} size='largeI'>
              Explore your network
            </Text>
            <Text nonsensitive style={style.listItemBody} element='p'>
              Get help finding who is worth referring from your LinkedIn
              connections. It&apos;s easier than doing&nbsp;it&nbsp;yourself!
            </Text>
          </Card>
        </li>
        <li className={css(style.listItem)}>
          <Card style={style.card}>
            <img
              className={css(style.listItemImage)}
              src='/assets/images/uncover-gems.svg'
              alt=''
            />
            <Text nonsensitive element='div' style={style.listItemHeading} size='largeI'>
              Share your jobs
            </Text>
            <Text nonsensitive style={style.listItemBody} element='p'>
              Share a trackable link to each of your company&apos;s jobs, any
              way you like - WhatsApp, Messenger or plain&nbsp;ol&apos;&nbsp;email.
            </Text>
          </Card>
        </li>
        <li className={css(style.listItem)}>
          <Card style={style.card}>
            <img
              className={css(style.listItemImage)}
              src='/assets/images/send-nudjes.svg'
              alt=''
            />
            <Text nonsensitive element='div' style={style.listItemHeading} size='largeI'>
              Get paid
            </Text>
            <Text nonsensitive style={style.listItemBody} element='p'>
              For every friend you refer who gets a job, you&apos;ll recieve the
              bonus on offer within 30 days of them&nbsp;starting.
            </Text>
          </Card>
        </li>
      </ul>
    </Section>
    <Section padding>
      <ButtonLink
        nonsensitive
        style={wizardStyles.action}
        href='/sync-contacts'
        volume='cheer'
      >
        Let&#39;s do this
      </ButtonLink>
    </Section>
  </Main>
)

module.exports = WelcomeTeamMember
