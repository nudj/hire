/* global Dispatch, Connection */
// @flow

const React = require('react')
const { Helmet } = require('react-helmet')

const { css } = require('@nudj/components/lib/css')
const { Card, Text } = require('@nudj/components')

const {
  parseLinkedinConnections,
  uploadLinkedinConnections
} = require('./actions')
const Loader = require('../../../components/loader')
const Dropzone = require('../../../components/connections-csv-uploader')
const ButtonLink = require('../../../components/button-link')
const Layout = require('../../../components/app-layout')
const sharedStyle = require('../../shared.css')

type Props = {
  dispatch: Dispatch,
  uploadPage: {
    connections: Array<Connection>,
    loading: boolean,
    parsing: boolean
  }
}

const getHandleDrop = dispatch => (acceptedFiles, rejectedFiles) => {
  if (acceptedFiles.length > 0) {
    dispatch(parseLinkedinConnections(acceptedFiles[0]))
  }
}

const getHandleNext = dispatch => () => {
  dispatch(uploadLinkedinConnections())
}

const LinkedinUploadPage = (props: Props) => {
  const { dispatch, uploadPage: state } = props

  return (
    <Layout
      {...props}
      styleSheet={{root: sharedStyle.root}}
      title='Part 1 - Unlock your network'
    >
      <Helmet>
        <title>Upload your LinkedIn connections</title>
      </Helmet>
      {state.loading ? (
        <Loader
          initialMessage='Uploading your connections'
          thresholdMessage='Still uploading'
          threshold={4000}
          ellipsis
        />
      ) : (
        <div className={css(sharedStyle.wrapper)}>
          <div className={css(sharedStyle.header)}>
            <Text element='div' size='largeIi' style={[sharedStyle.heading, sharedStyle.headingPrimary]}>
              Upload your Connections.csv file
            </Text>
            <Text element='p' style={sharedStyle.subheading}>
              Unzip the folder you've just downloaded, then drag and drop the Connections.csv file onto the box below.
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
              <Dropzone
                connections={state.connections}
                onDrop={getHandleDrop(dispatch)}
              />
            </Card>
          </div>
          {state.connections.length > 0 && (
            <div
              className={css(sharedStyle.body, sharedStyle.pageActionContainer)}
            >
              <ButtonLink
                href='/setup-network/linkedin/upload'
                volume='cheer'
                style={sharedStyle.next}
                onClick={getHandleNext(dispatch)}
              >
                Next
              </ButtonLink>
            </div>
          )}
        </div>
      )}
    </Layout>
  )
}

module.exports = LinkedinUploadPage
