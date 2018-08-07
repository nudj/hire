const React = require('react')

const { Text, Card } = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')
const mss = require('@nudj/components/lib/css/modifiers.css')

const ButtonLink = require('../../components/button-link')
const Main = require('../../components/main')
const Section = require('../../components/section')
const {
  Heading,
  Para,
  styleSheet: wizardStyles
} = require('../../components/wizard')

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
    <Section>
      <Card style={style.card}>
        <ul className={css(style.list)}>
          <li className={css(style.listItem)}>
            <div className={css(style.listItemContainer)}>
              <Text nonsensitive element='h2' size='largeIi' style={mss.fgPrimary}>
                <span className={css(mss.fgMidRed)}>1.</span>{' '}
                Build a best-in-class referral program
              </Text>
              <Text nonsensitive style={mss.mtReg} element='p'>
                A referral program that consistently delivers results - top talent and faster hires for less cash.
              </Text>
            </div>
          </li>
          <li className={css(style.listItem)}>
            <div className={css(style.listItemContainer)}>
              <Text nonsensitive element='h2' size='largeIi' style={mss.fgPrimary}>
                <span className={css(mss.fgMidRed)}>2.</span>{' '}
                Steal Google&apos;s magic
              </Text>
              <Text nonsensitive style={mss.mtReg} element='p'>
                Use techniques pioneered by Google&apos;s hiring team to help your employees uncover those hidden gems from their networks.
              </Text>
            </div>
          </li>
          <li className={css(style.listItem)}>
            <div className={css(style.listItemContainer)}>
              <Text nonsensitive element='h2' size='largeIi' style={mss.fgPrimary}>
                <span className={css(mss.fgMidRed)}>3.</span>{' '}
                Hire like a hero
              </Text>
              <Text nonsensitive style={mss.mtReg} element='p'>
                Track performance, manage applicants and make more referrals happen all from within the app.
              </Text>
            </div>
          </li>
        </ul>
      </Card>
    </Section>
    <Section padding>
      <ButtonLink
        nonsensitive
        style={wizardStyles.action}
        href='/setup-company'
        volume='cheer'
      >
        Okay, I&apos;m ready
      </ButtonLink>
    </Section>
  </Main>
)

module.exports = WelcomeAdmin
