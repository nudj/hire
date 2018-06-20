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
        Welcome to nudj!
      </Heading>
      <Para nonsensitive>
        Learn how easy it is to refer someone for a job and get rewarded with nudj.
      </Para>
    </Section>
    <Section>
      <ul className={css(style.list)}>
        <li className={css(style.listItem)}>
          <Card style={style.card}>
            <img
              className={css(style.listItemImage)}
              src='/assets/images/uncover-gems.svg'
              alt=''
            />
            <Text nonsensitive element='div' style={style.listItemHeading} size='largeI'>
              Share your company&apos;s jobs
            </Text>
            <Text nonsensitive style={style.listItemBody} element='p'>
              Share a trackable link to each of your company&apos;s jobs, however you want.
            </Text>
          </Card>
        </li>
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
              Search your LinkedIn connections to find more people worth referring (optional).
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
              Get rewarded
            </Text>
            <Text nonsensitive style={style.listItemBody} element='p'>
              If someone you refer gets the job, you&apos;ll get the bonus that&apos;s on offer.
            </Text>
          </Card>
        </li>
      </ul>
    </Section>
    <Section padding>
      <ButtonLink
        nonsensitive
        style={wizardStyles.action}
        href='/share-jobs'
        volume='cheer'
      >
        Let&#39;s do this
      </ButtonLink>
    </Section>
  </Main>
)

module.exports = WelcomeTeamMember
