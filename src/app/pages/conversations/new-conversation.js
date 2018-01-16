const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')

const { Card, Text } = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')

const ListJobs = require('../../components/job-radio-group')
const ButtonLink = require('../../components/button-link')
const Layout = require('../../components/app-layout')
const sharedStyle = require('../shared.css')
const { selectJob } = require('./actions')

const getHandleSelectJob = dispatch => ({ value }) => dispatch(selectJob(value))

const NewConversationPage = props => {
  const { dispatch } = props
  const selectedJobId = get(props, 'conversationsPage.jobId')
  const jobs = get(props, 'user.hirer.company.jobs', [])
  const connection = get(props, 'user.connection.firstName')

  return (
    <Layout {...props} styleSheet={{root: sharedStyle.root }}>
      <Helmet>
        <title>Select a job</title>
      </Helmet>
      <div className={css(sharedStyle.wrapper)}>
        <div className={css(sharedStyle.header)}>
          <Text element='div' size='largeIi' style={sharedStyle.heading}>
            Select the job you’d like to send {connection}
          </Text>
          <Text element='p' style={sharedStyle.subheading}>
            Select which of your company’s open jobs that this person is most
            likely to provide the best recommendations for. We’ll then create a
            unqiue link to this role for you.
          </Text>
        </div>
        <div className={css(sharedStyle.body)}>
          <Card style={sharedStyle.cardSmall}>
            <ListJobs
              name='jobId'
              jobs={jobs}
              onChange={getHandleSelectJob(dispatch)}
              selectedJobId={selectedJobId}
            />
          </Card>
        </div>
        <div className={css(sharedStyle.body, sharedStyle.pageActionContainer)}>
          <ButtonLink
            href={`${props.match.url}/${selectedJobId}`}
            volume='cheer'
            style={sharedStyle.next}
            disabled={!selectedJobId}
          >
            Next
          </ButtonLink>
        </div>
      </div>
    </Layout>
  )
}

module.exports = NewConversationPage
