// @flow
const React = require('react')
const { Helmet } = require('react-helmet')

const { Card, Text } = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')

const ButtonLink = require('../../components/button-link')
const sharedStyle = require('../shared.css')
const style = require('./style.css')

const LinkedInRequestGuide = () => (
  <div className={css(sharedStyle.root)}>
    <Helmet>
      <title>Downloading your connections from LinkedIn</title>
    </Helmet>
    <div className={css(sharedStyle.wrapper)}>
      <div className={css(sharedStyle.header)}>
        <Text element='div' size='largeIi' style={sharedStyle.heading}>
          Downloading your connections from LinkedIn
        </Text>
      </div>
      <Card style={sharedStyle.cardBody}>
        <img
          className={css(style.image)}
          src='/assets/images/linkedin-request-2.gif'
        />
        <ol className={css(style.list)}>
          <Text element='li'>
            Log into your email account (the one you use to access LinkedIn)
          </Text>
          <Text element='li'>
            Search for an email from LinkedIn with the subject - “Your LinkedIn
            data is ready!” If it’s not there, give it 5 minutes and check again
          </Text>
          <Text element='li'>Open the email</Text>
          <Text element='li'>
            Click the link to download your data - it will take you back to
            LinkedIn
          </Text>
          <Text element='li'>Click “Download archive”</Text>
          <Text element='li'>Next, click on “Pick & Choose”</Text>
          <Text element='li'>Then select "Connections"</Text>
          <Text element='li'>Click on "Request archive"</Text>
          <Text element='li'>Enter your password</Text>
          <Text element='li'>Hit "Done"</Text>
        </ol>
      </Card>
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
  </div>
)

module.exports = LinkedInRequestGuide
