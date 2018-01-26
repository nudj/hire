/* global Dispatch, Connection */
// @flow
const React = require('react')
const { Helmet } = require('react-helmet')

const { Card } = require('@nudj/components')
const mss = require('@nudj/components/lib/css/modifiers.css')

const {
  parseLinkedinConnections,
  uploadLinkedinConnections
} = require('../actions')
const Dropzone = require('../../../components/connections-csv-uploader')
const Loader = require('../../../components/loader')
const ButtonLink = require('../../../components/button-link')
const Layout = require('../../../components/app-layout')

const Main = require('../../../components/main')
const Section = require('../../../components/section')
const {
  Heading,
  Para,
  styleSheet: wizardStyles
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
    <Layout {...props} title='Part 1 - Unlock your network'>
      <Helmet>
        <title>Upload your LinkedIn connections</title>
      </Helmet>
      {state.loading ? (
        <Loader
          style={style.fullPageLoader}
          initialMessage='Uploading your connections'
          thresholdMessage='Still going'
          threshold={4000}
          ellipsis
        />
      ) : (
        <Main>
          <Section padding>
            <Heading>
              Upload your Connections.csv file
            </Heading>
            <Para>
              Unzip the folder you&#39;ve just downloaded, then drag and drop the Connections.csv file onto the box below.
            </Para>
          </Section>
          <Section padding width='regular'>
            <Card style={mss.pa0}>
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
        </Main>
      )}
    </Layout>
  )
}

module.exports = LinkedinUploadPage
