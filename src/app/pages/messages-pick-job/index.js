const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')

const { Card } = require('@nudj/components')
const { mss } = require('@nudj/components/styles')

const getPersonOrConnectionName = require('../../lib/get-person-or-connection-names')
const ListJobs = require('../../components/job-radio-group')
const ButtonLink = require('../../components/button-link')
const Layout = require('../../components/app-layout')
const { selectJob } = require('./actions')
const Main = require('../../components/main')
const Section = require('../../components/section')
const { Heading, Para } = require('../../components/app')

const getHandleSelectJob = dispatch => ({ value }) => dispatch(selectJob(value))

const MessagePickJobPage = props => {
  const { dispatch, recipient, user } = props
  const selectedJobId = get(props, 'pickJob.jobId')
  const jobs = get(user, 'hirer.company.jobs', [])
  const { firstName } = getPersonOrConnectionName(recipient)

  return (
    <Layout {...props}>
      <Helmet>
        <title>Select a job</title>
      </Helmet>
      <Main>
        <Section padding>
          <Heading nonsensitive level={1} style={mss.fgPrimary}>
            Pick a job
          </Heading>
          <Para nonsensitive>
            Select the job that you want to share with {firstName}
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
            nonsensitive
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

module.exports = MessagePickJobPage
