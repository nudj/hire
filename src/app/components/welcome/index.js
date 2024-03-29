const React = require('react')
const { Helmet } = require('react-helmet')

const { Link, Text, Card } = require('@nudj/components')
const { css, mss } = require('@nudj/components/styles')

const style = require('./style.css')
const ButtonLink = require('../button-link')
const Main = require('../main')
const Section = require('../section')
const { Heading, Para } = require('../wizard')

const Welcome = () => (
  <div>
    <Helmet>
      <title>Welcome to nudj</title>
    </Helmet>
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
        <img className={css(style.image)} src='/assets/images/review-the-best.svg' role='presentation' />
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
          <div className={css(style.options)}>
            <div className={css(mss.prLgIi)}>
              <Text
                nonsensitive
                element='h2'
                size='regular'
                style={[
                  mss.mtLgIi,
                  mss.bold,
                  mss.fgPrimary,
                  style.optionTitle
                ]}
              >
                New to nudj?
              </Text>
              <ButtonLink
                href='/signup'
                style={mss.mtReg}
              >
                Sign up
              </ButtonLink>
            </div>
            <div>
              <Text
                nonsensitive
                element='h2'
                size='regular'
                style={[
                  mss.mtLgIi,
                  mss.bold,
                  mss.fgPrimary,
                  style.optionTitle
                ]}
              >
                Already have an account?
              </Text>
              <ButtonLink
                href='/login'
                style={mss.mtReg}
              >
                Log in
              </ButtonLink>
            </div>
          </div>
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
  </div>
)

module.exports = Welcome
