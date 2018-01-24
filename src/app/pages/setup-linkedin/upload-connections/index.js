/* global Dispatch, Connection */
// @flow
const React = require('react')
const { Helmet } = require('react-helmet')

const { css } = require('@nudj/components/lib/css')
const { Card, Text } = require('@nudj/components')
const m = require('@nudj/components/lib/css/modifiers.css')

const {
  parseLinkedinConnections,
  uploadLinkedinConnections
} = require('../actions')
const Dropzone = require('../../../components/connections-csv-uploader')
const ButtonLink = require('../../../components/button-link')
const Layout = require('../../../components/app-layout')

const {
  Wrapper,
  Section,
  Heading,
  P,
  styleSheet: wizardStyles,
} = require('../../../components/wizard')
const style = require('../style.css')

type Props = {
  dispatch: Dispatch,
  uploadLinkedinConnectionsPage: {
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
  const { dispatch, uploadLinkedinConnectionsPage: state } = props

  return (
    <Layout
      {...props}
      styleSheet={{root: wizardStyles.root}}
      title='Part 1 - Unlock your network'
    >
      <Helmet>
        <title>Upload your LinkedIn connections</title>
      </Helmet>
      <Wrapper>
        <Section padding>
          <Heading>
            Upload your Connections.csv file
          </Heading>
          <P>
            Unzip the folder you've just downloaded, then drag and drop the Connections.csv file onto the box below.
          </P>
        </Section>
        <Section padding width="regular">
          <Card style={m.pa0}>
            <Dropzone
              connections={state.connections}
              onDrop={getHandleDrop(dispatch)}
            />
          </Card>
        </Section>
        <Section padding>
          <ButtonLink
            href='/setup-network/linkedin/upload'
            volume='cheer'
            style={wizardStyles.action}
            onClick={getHandleNext(dispatch)}
            disabled={state.connections.length < 1}
          >
            Next
          </ButtonLink>
        </Section>
      </Wrapper>
    </Layout>
  )
}

module.exports = LinkedinUploadPage
