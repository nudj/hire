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

const GetStartedPage = (props) => (
  <Layout {...props}>
    <Helmet>
      <title>Get Started</title>
    </Helmet>
    <Main>
      <Section padding>
        <Heading>
          Start hiring with nudj
        </Heading>
        <Para>
          You are a few short tasks away from hiring someone great.
        </Para>
      </Section>
      <Section>
        <ul className={css(style.list)}>
          <li className={css(style.listItem)}>
            <Card style={style.card}>
              <Text element='div' size='largeIi' style={mss.fgMidRed}>Step 1</Text>
              <img
                className={css(style.listItemImage)}
                src='/assets/images/unlock-network.svg'
                alt=''
              />
              <Text element='div' style={style.listItemHeading} size='largeI'>
                Unlock your network
              </Text>
              <Text style={style.listItemBody} element='p'>
                Get all your contacts together to explore your entire network in one place.
              </Text>
            </Card>
          </li>
          <li className={css(style.listItem)}>
            <Card style={style.card}>
              <Text element='div' size='largeIi' style={mss.fgMidRed}>Step 2</Text>
              <img
                className={css(style.listItemImage)}
                src='/assets/images/uncover-gems.svg'
                alt=''
              />
              <Text element='div' style={style.listItemHeading} size='largeI'>
                Uncover hidden gems
              </Text>
              <Text style={style.listItemBody} element='p'>
                Find the people in your network who can connect you to the best talent.
              </Text>
            </Card>
          </li>
          <li className={css(style.listItem)}>
            <Card style={style.card}>
              <Text element='div' size='largeIi' style={mss.fgMidRed}>Step 3</Text>
              <img
                className={css(style.listItemImage)}
                src='/assets/images/send-nudjes.svg'
                alt=''
              />
              <Text element='div' style={style.listItemHeading} size='largeI'>
                Send a nudj
              </Text>
              <Text style={style.listItemBody} element='p'>
                Write and send personalised
                messages to get the responses you need.
              </Text>
            </Card>
          </li>
        </ul>
      </Section>
      <Section padding>
        <ButtonLink
          style={wizardStyles.action}
          href='/setup-network'
          volume='cheer'
        >
          Let&#39;s do this
        </ButtonLink>
      </Section>
    </Main>
  </Layout>
)

module.exports = GetStartedPage
