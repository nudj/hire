const React = require('react')

const { Link, Text, Card } = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')
const mss = require('@nudj/components/lib/css/modifiers.css')

const ButtonLink = require('../../components/button-link')
const Main = require('../../components/main')
const Section = require('../../components/section')
const { Heading, Para } = require('../../components/wizard')

const WelcomeAdmin = ({ style }) => (
  <Main>
    <Section padding>
      <Heading nonsensitive>
        Welcome to nudj!
      </Heading>
      <Para nonsensitive>
        Get started with nudj and find out how you can source the best talent.
      </Para>
    </Section>
    <Section style={style.body} padding>
      <img className={css(style.image)} src='/assets/images/review-the-best.svg' presentation />
      <Card style={style.card}>
        <Text nonsensitive element='h2' size='largeI' style={style.subheading}>
          Build a best-in-class referral program
        </Text>
        <Text nonsensitive style={mss.mtReg} element='p'>
          A referral program that consistently delivers results - top talent and faster hires for less cash.
        </Text>
        <Text nonsensitive element='h2' size='largeI' style={style.subheading}>
          Steal Google&apos;s magic
        </Text>
        <Text nonsensitive style={mss.mtReg} element='p'>
          Use techniques pioneered by Google&apos;s hiring team to help your employees uncover those hidden gems from their networks.
        </Text>
        <Text nonsensitive element='h2' size='largeI' style={style.subheading}>
          Hire like a hero
        </Text>
        <Text nonsensitive style={mss.mtReg} element='p'>
          Track performance, manage applicants and make more referrals happen all from within the app.
        </Text>
        <ButtonLink
          href='/'
          style={mss.mtLgIi}
          volume='cheer'
        >
          Explore nudj
        </ButtonLink>
      </Card>
    </Section>
    <Section style={style.footer} padding>
      <div className={css(style.help)}>
        <Text
          nonsensitive
          element='h2'
          size='regular'
          style={[
            mss.bold,
            mss.fgPrimary
          ]}
        >
          Need help?
        </Text>
        <ul className={css(style.questionsList)}>
          <li className={css(style.questionsListItem)}>
            <Link
              nonsensitive
              href='mailto:help@nudj.co'
              id='open-intercom'
              subtle
              inline
            >
              Talk to a human
            </Link>
          </li>
          <li className={css(style.questionsListItem)}>
            <Link
              href='https://help.nudj.co'
              target='_blank'
              nonsensitive
              subtle
              inline
            >
              FAQ
            </Link>
          </li>
        </ul>
      </div>
    </Section>
  </Main>
)

module.exports = WelcomeAdmin
