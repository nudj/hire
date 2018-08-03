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
                Set up your company in seconds
              </Text>
              <Text nonsensitive style={mss.mtReg} element='p'>
                Tell us about your company and the roles you&apos;re hiring
                for.
              </Text>
            </div>
          </li>
          <li className={css(style.listItem)}>
            <div className={css(style.listItemContainer)}>
              <Text nonsensitive element='h2' size='largeIi' style={mss.fgPrimary}>
                <span className={css(mss.fgMidRed)}>2.</span>{' '}
                Easily track your performance
              </Text>
              <Text nonsensitive style={mss.mtReg} element='p'>
                Quickly understand what is going on with your jobs, so you can focus
                on just those that need your attention.
              </Text>
            </div>
          </li>
          <li className={css(style.listItem)}>
            <div className={css(style.listItemContainer)}>
              <Text nonsensitive element='h2' size='largeIi' style={mss.fgPrimary}>
                <span className={css(mss.fgMidRed)}>3.</span>{' '}
                View all your applicants in one place
              </Text>
              <Text nonsensitive style={mss.mtReg} element='p'>
                Referred applicants often have a poor experience, because they
                don&apos;t get “referrential” treatment. By putting them in
                one place, you can make sure they do.
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
