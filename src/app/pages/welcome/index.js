const React = require('react')
const { Helmet } = require('react-helmet')

const { Text, Card } = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')
const mss = require('@nudj/components/lib/css/modifiers.css')

const ButtonLink = require('../../components/button-link')
const Layout = require('../../components/app-layout')
const Main = require('../../components/main')
const Section = require('../../components/section')
const {
  Heading,
  Para,
  styleSheet: wizardStyles
} = require('../../components/wizard')
const style = require('./style.css')

const WelcomePage = props => {
  const { hirerTypes } = props.enums
  const { type: hirerStatus } = props.user.hirer

  return (
    <Layout {...props}>
      <Helmet>
        <title>Welcome</title>
      </Helmet>
      <Main>
        <Section padding>
          <Heading>
            Welcome to nudj
          </Heading>
          <Para>
            So you&apos;ve decided to give nudj a try - here&apos;s why you won&apos;t be disappointed.
          </Para>
        </Section>
        <Section>
          <Card style={style.card}>
            <ul className={css(style.list)}>
              <li className={css(style.listItem)}>
                <div className={css(style.listItemContainer)}>
                  <Text element='h2' size='largeIi' style={style.listItemHeading}>
                    <span className={css(mss.fgMidRed)}>1. </span> Easily find who to ask
                  </Text>
                  <Text style={style.listItemBody} element='p'>
                    It can be hard to know who to ask for referrals. With nudj, however, you can quickly and easily uncover who from your network can help.
                  </Text>
                </div>
              </li>
              <li className={css(style.listItem)}>
                <div className={css(style.listItemContainer)}>
                  <Text element='h2' size='largeIi' style={style.listItemHeading}>
                    <span className={css(mss.fgMidRed)}>2. </span> Get help asking them
                  </Text>
                  <Text style={style.listItemBody} element='p'>
                    We&apos;ve created simple message templates for you because we know the last thing you want to have to do is write another email.
                  </Text>
                </div>
              </li>
              <li className={css(style.listItem)}>
                <div className={css(style.listItemContainer)}>
                  <Text element='h2' size='largeIi' style={style.listItemHeading}>
                    <span className={css(mss.fgMidRed)}>3. </span> Everyone gets rewarded
                  </Text>
                  <Text style={style.listItemBody} element='p'>
                    With nudj, your company is able to pay for successful referrals regardless of where they came from - meaning your friends can get rewarded too.
                  </Text>
                </div>
              </li>
            </ul>
          </Card>
        </Section>
        <Section padding>
          <ButtonLink
            style={wizardStyles.action}
            href={hirerStatus === hirerTypes.ADMIN ? '/invite-team' : '/get-started'}
            volume='cheer'
          >
            Ok, I&apos;m ready
          </ButtonLink>
        </Section>
      </Main>
    </Layout>
  )
}

module.exports = WelcomePage
