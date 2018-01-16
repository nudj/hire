// @flow
const React = require('react')
const { Helmet } = require('react-helmet')

const { Card, Text } = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')

const ButtonLink = require('../../components/button-link')
const Layout = require('../../components/app-layout')
const sharedStyle = require('../shared.css')

const LinkedInRequestGuide = props => (
  <Layout {...props} styleSheet={{root: sharedStyle.root }} title="Part 1 - Unlock your network">
    <Helmet>
      <title>Downloading your connections from LinkedIn</title>
    </Helmet>
    <div className={css(sharedStyle.wrapper)}>
      <div className={css(sharedStyle.header)}>
        <Text element='div' size='largeIi' style={sharedStyle.heading}>
          Downloading your connections from LinkedIn
        </Text>
      </div>
      <div className={css(sharedStyle.body)}>
        <Card>
          <img
            className={css(sharedStyle.image)}
            src='/assets/images/linkedin-request-2.gif'
          />
          <ol className={css(sharedStyle.list)}>
            <Text element='li'>
              Log into your email account (the one you use to access LinkedIn)
            </Text>
            <Text element='li'>
              Search for an email from LinkedIn with the subject -{' '}
              <em className={css(sharedStyle.em)}>
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
              Click <em className={css(sharedStyle.em)}>Download archive</em>
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
          href='/setup-network/linkedin/upload'
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
