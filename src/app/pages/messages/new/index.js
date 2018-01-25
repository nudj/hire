const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')

const { Card, Text } = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')
const m = require('@nudj/components/lib/css/modifiers.css')

const ListJobs = require('../../../components/job-radio-group')
const ButtonLink = require('../../../components/button-link')
const Layout = require('../../../components/app-layout')
const { selectJob } = require('./actions')
const Wrapper = require('../../../components/wrapper')
const Section = require('../../../components/section')
const { Heading, P } = require('../../../components/app')

const getHandleSelectJob = dispatch => ({ value }) => dispatch(selectJob(value))

const NewConversationPage = props => {
  const { dispatch } = props
  const selectedJobId = get(props, 'composeMessage.jobId')
  const jobs = get(props, 'user.hirer.company.jobs', [])
  const connection = get(props, 'user.connection.firstName')

  return (
    <Layout {...props}>
      <Helmet>
        <title>Select a job</title>
      </Helmet>
      <Wrapper>
        <Section padding>
          <Heading level={1} style={m.fgPrimary}>
            Select the job you’d like to send {connection}
          </Heading>
          <P>
            Select which of your company&#39;s open jobs this person is most
            likely to provide the best recommendations for.
          </P>
        </Section>
        <Section padding width="smallI">
          <Card>
            <ListJobs
              name='jobId'
              jobs={jobs}
              onChange={getHandleSelectJob(dispatch)}
              selectedJobId={selectedJobId}
            />
          </Card>
        </Section>
        <Section padding style={m.center}>
          <ButtonLink
            href={`${props.match.url}/${selectedJobId}`}
            volume='cheer'
            disabled={!selectedJobId}
          >
            Next
          </ButtonLink>
        </Section>
      </Wrapper>
    </Layout>
  )
}

module.exports = NewConversationPage
