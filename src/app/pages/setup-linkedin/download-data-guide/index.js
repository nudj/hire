// @flow
const React = require('react')
const { Helmet } = require('react-helmet')

const { Card, Text } = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')
const m = require('@nudj/components/lib/css/modifiers.css')

const ButtonLink = require('../../../components/button-link')
const Layout = require('../../../components/app-layout')
const {
  Wrapper,
  Section,
  Heading,
  styleSheet: wizardStyles,
} = require('../../../components/wizard')
const style = require('../style.css')

const LinkedinDownloadGuidePage = (props: Object) => (
  <Layout
    {...props}
    styleSheet={{root: wizardStyles.root}}
    title='Part 1 - Unlock your network'
  >
    <Helmet>
      <title>Downloading your connections from LinkedIn</title>
    </Helmet>
    <Wrapper>
      <Section padding>
        <Heading>
          Downloading your connections from LinkedIn
        </Heading>
      </Section>
      <Section padding>
        <Card>
          <img
            className={css(style.image)}
            src='/assets/images/linkedin-request-2.gif'
          />
          <ol className={css(style.list)}>
            <Text element='li'>
              Log into your email account (the one you use to access LinkedIn)
            </Text>
            <Text element='li'>
              Search for an email from LinkedIn with the subject -{' '}
              <em className={css(m.i)}>
                Your LinkedIn data is ready!
              </em>{' '}
              If it’s not there, give it 5 minutes and check again
            </Text>
            <Text element='li'>Open the email</Text>
            <Text element='li'>
              Click the link to download your data - it will take you back to
              LinkedIn
            </Text>
            <Text element='li'>
              Click <em className={css(m.i)}>Download archive</em>
            </Text>
            <Text element='li'>
              Next, click on{' '}
              <em className={css(m.i)}>Pick & Choose</em>
            </Text>
            <Text element='li'>
              Then select <em className={css(m.i)}>Connections</em>
            </Text>
            <Text element='li'>
              Click on <em className={css(m.i)}>Request archive</em>
            </Text>
            <Text element='li'>Enter your password</Text>
            <Text element='li'>
              Hit <em className={css(m.i)}>Done</em>
            </Text>
          </ol>
        </Card>
      </Section>
      <Section padding>
        <ButtonLink
          href='/setup-network/linkedin/upload'
          volume='cheer'
          style={wizardStyles.action}
        >
          Next
        </ButtonLink>
      </Section>
    </Wrapper>
  </Layout>
)

module.exports = LinkedinDownloadGuidePage
