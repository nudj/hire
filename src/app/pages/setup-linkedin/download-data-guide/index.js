const React = require('react')
const { Helmet } = require('react-helmet')

const { Card, Text } = require('@nudj/components')
const { css, mss } = require('@nudj/components/styles')

const ButtonLink = require('../../../components/button-link')
const Layout = require('../../../components/app-layout')
const Main = require('../../../components/main')
const Section = require('../../../components/section')
const {
  Heading,
  styleSheet: wizardStyles
} = require('../../../components/wizard')
const style = require('../style.css')

const LinkedinDownloadGuidePage = props => (
  <Layout {...props}>
    <Helmet>
      <title>Download your connections from LinkedIn</title>
    </Helmet>
    <Main>
      <Section padding>
        <Heading nonsensitive>
          Download your connections from LinkedIn
        </Heading>
      </Section>
      <Section padding>
        <Card>
          <img
            className={css(style.image)}
            src='/assets/images/linkedin-request-2.gif'
          />
          <ol className={css(style.list)}>
            <Text nonsensitive element='li'>
              Log into your email account (the one you use to access LinkedIn)
            </Text>
            <Text nonsensitive element='li'>
              Search for an email from LinkedIn with the subject -{' '}
              <em className={css(mss.i)}>
                Your LinkedIn data is ready!
              </em>{' '}
              If it’s not there, give it 5 minutes and check again
            </Text>
            <Text nonsensitive element='li'>Open the email</Text>
            <Text nonsensitive element='li'>
              Click the link to download your data - it will take you back to
              LinkedIn
            </Text>
            <Text nonsensitive element='li'>
              Click <em className={css(mss.i)}>Download archive</em>
            </Text>
            <Text nonsensitive element='li'>
              Next, click on{' '}
              <em className={css(mss.i)}>Pick & Choose</em>
            </Text>
            <Text nonsensitive element='li'>
              Then select <em className={css(mss.i)}>Connections</em>
            </Text>
            <Text nonsensitive element='li'>
              Click on <em className={css(mss.i)}>Request archive</em>
            </Text>
            <Text nonsensitive element='li'>Enter your password</Text>
            <Text nonsensitive element='li'>
              Hit <em className={css(mss.i)}>Done</em>
            </Text>
          </ol>
        </Card>
      </Section>
      <Section padding>
        <ButtonLink
          nonsensitive
          href='/sync-contacts/linkedin/upload'
          volume='cheer'
          style={wizardStyles.action}
        >
          Next
        </ButtonLink>
      </Section>
    </Main>
  </Layout>
)

module.exports = LinkedinDownloadGuidePage
