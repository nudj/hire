// @flow
const React = require('react')
const { Helmet } = require('react-helmet')

const { Text, Card } = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')
const m = require('@nudj/components/lib/css/modifiers.css')

const ButtonLink = require('../../components/button-link')
const Layout = require('../../components/app-layout')
const Wrapper = require('../../components/wrapper')
const Section = require('../../components/section')
const {
  Heading,
  P,
  styleSheet: wizardStyles
} = require('../../components/wizard')
const style = require('./style.css')

const WelcomePage = (props: Object) => (
  <Layout {...props}>
    <Helmet>
      <title>Welcome</title>
    </Helmet>
    <Wrapper>
      <Section padding>
        <Heading>
          Welcome to nudj
        </Heading>
        <P>
          Before we being, we need you to complete a number of short tasks that
          will maximise your chances of finding someone awesome to hire and work
          with.
        </P>
      </Section>
      <Section>
        <ul className={css(style.list)}>
          <li className={css(style.listItem)}>
            <Card style={style.card}>
              <Text element='div' size='largeIi' style={m.fgMidRed}>Step 1</Text>
              <img
                className={css(style.listItemImage)}
                src='/assets/images/unlock-network.svg'
                alt=''
              />
              <Text element='div' style={style.listItemHeading} size='largeI'>
                Unlock your network
              </Text>
              <Text style={style.listItemBody} element='p'>
                Export your connections from
                various sources, allowing you to explore your entire network.
              </Text>
            </Card>
          </li>
          <li className={css(style.listItem)}>
            <Card style={style.card}>
              <Text element='div' size='largeIi' style={m.fgMidRed}>Step 2</Text>
              <img
                className={css(style.listItemImage)}
                src='/assets/images/uncover-gems.svg'
                alt=''
              />
              <Text element='div' style={style.listItemHeading} size='largeI'>
                Uncover hidden gems
              </Text>
              <Text style={style.listItemBody} element='p'>
                Identify key people within your network who are
                worth asking for recommendations.
              </Text>
            </Card>
          </li>
          <li className={css(style.listItem)}>
            <Card style={style.card}>
              <Text element='div' size='largeIi' style={m.fgMidRed}>Step 3</Text>
              <img
                className={css(style.listItemImage)}
                src='/assets/images/send-nudjes.svg'
                alt=''
              />
              <Text element='div' style={style.listItemHeading} size='largeI'>
                Send nudjes
              </Text>
              <Text style={style.listItemBody} element='p'>
                Compose and send personalised
                messages to the people you&#39;ve identified.
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
    </Wrapper>
  </Layout>
)

module.exports = WelcomePage
