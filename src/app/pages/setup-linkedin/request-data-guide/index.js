// @flow
const React = require('react')
const { Helmet } = require('react-helmet')

const { Card, Text, Link } = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')
const m = require('@nudj/components/lib/css/modifiers.css')

const ButtonLink = require('../../../components/button-link')
const Layout = require('../../../components/app-layout')
const Wrapper = require('../../../components/wrapper')
const Section = require('../../../components/section')
const {
  Heading,
  styleSheet: wizardStyles,
} = require('../../../components/wizard')
const style = require('../style.css')

const LinkedinRequestGuidePage = (props: Object) => (
  <Layout {...props} title='Part 1 - Unlock your network'>
    <Helmet>
      <title>Requesting your data from LinkedIn</title>
    </Helmet>
    <Wrapper>
      <Section padding>
        <Heading>
          Requesting your data from LinkedIn
        </Heading>
      </Section>
      <Section padding>
        <Card>
          <img
            className={css(style.image)}
            src='/assets/images/linkedin-request-1.gif'
          />
          <ol className={css(style.list)}>
            <Text element='li'>
              Go to your{' '}
              <Link
                subtle
                inline
                volume='scream'
                href='https://www.linkedin.com/psettings/member-data'
                target='_blank'
              >
                LinkedIn Settings
              </Link>
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
          href='/setup-network/linkedin/download-data'
          volume='cheer'
          style={wizardStyles.action}
        >
          Next
        </ButtonLink>
      </Section>
    </Wrapper>
  </Layout>
)

module.exports = LinkedinRequestGuidePage
