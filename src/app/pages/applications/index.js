const React = require('react')
const format = require('date-fns/format')
const { List } = require('@nudj/components')
const { css, mss } = require('@nudj/components/styles')
const { Link } = require('react-router-dom')

const Layout = require('../../components/app-layout')
const ActionableListContents = require('../../components/actionable-list-contents')
const ButtonLink = require('../../components/button-link')
const ActionBar = require('../../components/action-bar')
const Section = require('../../components/section')
const { Heading, Para } = require('../../components/app')
const { fetchName } = require('../../lib')

const style = require('./style.css')

const ApplicationsPage = props => {
  const { jobs } = props.user.hirer.company
  const jobsWithApplications = jobs.filter(job => job.applications.length)

  return (
    <Layout {...props}>
      {jobsWithApplications.length ? (
        <div>
          <ActionBar />
          {jobsWithApplications.map(job => {
            return (
              <div key={job.slug} className={css(style.listHeading)}>
                <Heading
                  id={job.slug}
                  level={2}
                  style={mss.left}
                  nonsensitive
                >
                  {job.title}
                </Heading>
                <List style={mss.mtReg}>
                  {ListItem => job.applications.map(application => (
                    <ListItem key={application.id} joined={false}>
                      <ActionableListContents
                        title={fetchName(application.person)}
                        subtitle={application.person.email}
                        styleSheet={{ root: style.listItem }}
                        dataPoints={[
                          {
                            key: 'Applied on',
                            value: format(application.created, 'DD-MM-YYYY')
                          },
                          {
                            key: 'Referred by',
                            value: application.referral ? fetchName(application.referral.person) : 'nudj'
                          }
                        ]}
                      >
                        {Action => [
                          <Action
                            key='email'
                            Component='a'
                            href={`mailto:${application.person.email}`}
                          >
                            Email applicant
                          </Action>,
                          <Action
                            key='details'
                            Component={Link}
                            to={`/applications/${application.id}`}
                          >
                            View details
                          </Action>
                        ]}
                      </ActionableListContents>
                    </ListItem>
                  ))}
                </List>
              </div>
            )
          })}
        </div>
      ) : (
        <Section>
          <Heading nonsensitive level={1} style={mss.fgPrimary}>
            You haven&apos;t received any applications yet
          </Heading>
          <Para nonsensitive>
            To get people to apply, you&apos;ll need to share your jobs far and wide.
          </Para>
          <div className={css(mss.center)}>
            <ButtonLink
              nonsensitive
              href='/share-jobs'
              style={mss.mtLgI}
              name='emailProvider'
              volume='cheer'
              subtle
            >
              Share a job
            </ButtonLink>
          </div>
        </Section>
      )}
    </Layout>
  )
}

module.exports = ApplicationsPage
