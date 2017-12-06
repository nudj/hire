// @flow
const React = require('react')
const get = require('lodash/get')
const { Helmet } = require('react-helmet')

const { Card, Text, Link } = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')

const ButtonLink = require('../../components/button-link')
const sharedStyle = require('../shared.css')
const style = require('./style.css')

const LinkedInRequestGuide = () => (
  <div className={css(sharedStyle.root)}>
    <Helmet>
      <title>nudj - upload your LinkedIn contacts</title>
    </Helmet>
    <div className={css(sharedStyle.wrapper)}>
      <div className={css(sharedStyle.header)}>
        <Text element="div" size="largeIi" style={sharedStyle.heading}>
          Requesting your data from LinkedIn
        </Text>
      </div>
      <Card style={sharedStyle.cardBody}>
        <img
          className={css(style.image)}
          src="/assets/images/linkedin-request-1.gif"
        />
        <ol className={css(style.list)}>
          <Text element="li">
            Go to your{' '}
            <Link
              subtle
              inline
              volume="scream"
              href="https://www.linkedin.com/psettings/member-data"
              target="_blank"
            >
              LinkedIn Settings
            </Link>
          </Text>
          <Text element="li">Next, click on “Pick & Choose”</Text>
          <Text element="li">Then select "Connections"</Text>
          <Text element="li">Click on "Request archive"</Text>
          <Text element="li">Enter your password</Text>
          <Text element="li">Hit "Done"</Text>
        </ol>
      </Card>
      <div className={css(sharedStyle.body, sharedStyle.pageActionContainer)}>
        <ButtonLink
          href="/setup-network/linkedin/download-data"
          volume="cheer"
          style={sharedStyle.next}
        >
          Next
        </ButtonLink>
      </div>
    </div>
  </div>
)

module.exports = LinkedInRequestGuide
