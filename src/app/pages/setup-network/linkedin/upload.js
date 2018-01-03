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
const Dropzone = require('../../../components/connections-csv-uploader')
const ButtonLink = require('../../../components/button-link')
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
    <div className={css(sharedStyle.root)}>
      <Helmet>
        <title>Upload your LinkedIn connections</title>
      </Helmet>
      <div className={css(sharedStyle.wrapper)}>
        <div className={css(sharedStyle.header)}>
          <Text element='div' size='largeIi' style={sharedStyle.heading}>
            Upload your Connections.csv file
          </Text>
          <Text element='p' style={sharedStyle.subheading}>
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
    </div>
  )
}

module.exports = LinkedinUploadPage
