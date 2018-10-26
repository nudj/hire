const React = require('react')
const { Helmet } = require('react-helmet')

const { Card } = require('@nudj/components')
const { mss } = require('@nudj/components/styles')

const {
  parseLinkedinConnections,
  uploadLinkedinConnections
} = require('../actions')
const Dropzone = require('../../../components/connections-csv-uploader')
const Loader = require('../../../components/staged-loader')
const ButtonLink = require('../../../components/button-link')
const Layout = require('../../../components/app-layout')

const Main = require('../../../components/main')
const Section = require('../../../components/section')
const {
  Heading,
  Para,
  styleSheet: wizardStyles
} = require('../../../components/wizard')

const getHandleDrop = dispatch => (acceptedFiles, rejectedFiles) => {
  if (acceptedFiles.length > 0) {
    dispatch(parseLinkedinConnections(acceptedFiles[0]))
  }
}

const getHandleNext = dispatch => () => {
  dispatch(uploadLinkedinConnections())
}

const LinkedinUploadPage = props => {
  const { dispatch, uploadLinkedinConnectionsPage: state } = props

  return (
    <Layout {...props}>
      <Helmet>
        <title>Upload your LinkedIn connections</title>
      </Helmet>
      <Main>
        <Section padding>
          <Heading nonsensitive>
            Upload your connections
          </Heading>
          <Para nonsensitive>
            Unzip the folder you&#39;ve just downloaded, then drag and drop the Connections.csv file onto the box.
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
            nonsensitive
            href='/sync-contacts/linkedin/upload'
            volume='cheer'
            style={wizardStyles.action}
            onClick={getHandleNext(dispatch)}
            disabled={state.connections.length < 1 || state.loading}
          >
            { state.loading ? (
              <Loader
                messages={[
                  'Uploading your connections',
                  'Adding them to your account',
                  'Getting them ready for search',
                  'Wow, you certainly are popular',
                  'Seriously, this must be some kind of record',
                  'Is there anyone you don\'t know',
                  'Ok, this is taking the biscuit',
                  'Speaking of biscuits, why don\'t you grab one while you wait',
                  'Nearly there',
                  'Just a few more seconds',
                  'Good things come to those who wait'
                ]}
                threshold={4000}
                ellipsis
              />
            ) : 'Next' }
          </ButtonLink>
        </Section>
      </Main>
    </Layout>
  )
}

module.exports = LinkedinUploadPage
