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
        Welcome to nudj
      </Heading>
      <Para nonsensitive>
        So you&apos;ve decided to give nudj a try - here&apos;s why you won&apos;t&nbsp;be&nbsp;disappointed.
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
                Tell us about your company, add a brief description of the roles
                you&apos;re currently hiring for, set the referral bonuses and we&apos;ll
                automatically add job pages to our platform for you.
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
                Quickly understand who&apos;s referring and who&apos;s applying
                for your jobs, allowing you to focus on the jobs that
                need your attention.
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
                Most referred applicants have a bad experience, because they
                don&apos;t get “referrential” treatment - by putting them in
                one place, you can keep on top of them.
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
        Ok, I&apos;m ready
      </ButtonLink>
    </Section>
  </Main>
)

module.exports = WelcomeAdmin
