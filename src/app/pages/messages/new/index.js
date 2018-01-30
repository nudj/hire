const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')

const { Card } = require('@nudj/components')
const mss = require('@nudj/components/lib/css/modifiers.css')

const ListJobs = require('../../../components/job-radio-group')
const ButtonLink = require('../../../components/button-link')
const Layout = require('../../../components/app-layout')
const { selectJob } = require('./actions')
const Main = require('../../../components/main')
const Section = require('../../../components/section')
const { Heading, Para } = require('../../../components/app')

const getHandleSelectJob = dispatch => ({ value }) => dispatch(selectJob(value))

const NewConversationPage = props => {
  const { dispatch } = props
  const selectedJobId = get(props, 'composeMessage.jobId')
  const jobs = get(props, 'user.hirer.company.jobs', [])
  const recipient = get(props, 'recipient.firstName')

  return (
    <Layout {...props}>
      <Helmet>
        <title>Select a job</title>
      </Helmet>
      <Main>
        <Section padding>
          <Heading level={1} style={mss.fgPrimary}>
            Select the job you’d like to send {recipient}
          </Heading>
          <Para>
            Select which of your company&#39;s open jobs this person is most
            likely to provide the best recommendations for.
          </Para>
        </Section>
        <Section padding width='smallI'>
          <Card>
            <ListJobs
              name='jobId'
              jobs={jobs}
              onChange={getHandleSelectJob(dispatch)}
              selectedJobId={selectedJobId}
            />
          </Card>
        </Section>
        <Section padding style={mss.center}>
          <ButtonLink
            href={`${props.match.url}/${selectedJobId}`}
            volume='cheer'
            disabled={!selectedJobId}
          >
            Next
          </ButtonLink>
        </Section>
      </Main>
    </Layout>
  )
}

module.exports = NewConversationPage
