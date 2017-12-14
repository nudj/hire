// @flow
const React = require('react')
const { Helmet } = require('react-helmet')

const { css } = require('@nudj/components/lib/css')
const { Card, Text } = require('@nudj/components')

const Dropzone = require('../../../components/connections-csv-uploader')
const ButtonLink = require('../../../components/button-link')
const sharedStyle = require('../../shared.css')

const LinkedinUploadPage = () => (
  <div className={css(sharedStyle.root)}>
    <Helmet>
      <title>Upload your LinkedIn connections</title>
    </Helmet>
    <div className={css(sharedStyle.wrapper)}>
      <div className={css(sharedStyle.header)}>
        <Text element="div" size="largeIi" style={sharedStyle.heading}>
          Upload your Connections.csv file
        </Text>
        <Text element="p" style={sharedStyle.subheading}>
          Simply drag and drop your file into the box below.
        </Text>
      </div>
      <div className={css(sharedStyle.body)}>
        <Card
          style={[
            sharedStyle.card,
            sharedStyle.cardMedium,
            sharedStyle.noPadding
          ]}
        >
          <Dropzone />
        </Card>
      </div>
      <div className={css(sharedStyle.body, sharedStyle.pageActionContainer)}>
        <ButtonLink
          href="/setup-network/linkedin/upload"
          volume="cheer"
          style={sharedStyle.next}
        >
          Next
        </ButtonLink>
      </div>
    </div>
  </div>
)

module.exports = LinkedinUploadPage
