// @flow
const React = require('react')
const { Helmet } = require('react-helmet')

const { Card, Text, Link } = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')

const ButtonLink = require('../../components/button-link')
const Layout = require('../../components/app-layout')
const sharedStyle = require('../shared.css')

const LinkedInRequestGuide = props => (
  <Layout {...props} styleSheet={{root: sharedStyle.root }} title="Part 1 - Unlock your network">
    <Helmet>
      <title>Requesting your data from LinkedIn</title>
    </Helmet>
    <div className={css(sharedStyle.wrapper)}>
      <div className={css(sharedStyle.header)}>
        <Text element='div' size='largeIi' style={sharedStyle.heading}>
          Requesting your data from LinkedIn
        </Text>
      </div>
      <div className={css(sharedStyle.body)}>
        <Card>
          <img
            className={css(sharedStyle.image)}
            src='/assets/images/linkedin-request-1.gif'
          />
          <ol className={css(sharedStyle.list)}>
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
              <em className={css(sharedStyle.em)}>Pick & Choose</em>
            </Text>
            <Text element='li'>
              Then select <em className={css(sharedStyle.em)}>Connections</em>
            </Text>
            <Text element='li'>
              Click on <em className={css(sharedStyle.em)}>Request archive</em>
            </Text>
            <Text element='li'>Enter your password</Text>
            <Text element='li'>
              Hit <em className={css(sharedStyle.em)}>Done</em>
            </Text>
          </ol>
        </Card>
      </div>
      <div className={css(sharedStyle.body, sharedStyle.pageActionContainer)}>
        <ButtonLink
          href='/setup-network/linkedin/download-data'
          volume='cheer'
          style={sharedStyle.next}
        >
          Next
        </ButtonLink>
      </div>
    </div>
  </Layout>
)

module.exports = LinkedInRequestGuide
