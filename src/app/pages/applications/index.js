const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')
const { format } = require('date-fns')
const startCase = require('lodash/startCase')

const mss = require('@nudj/components/lib/css/modifiers.css')
const { css } = require('@nudj/components/lib/css')
const { Align, Card, EmailButton, Text } = require('@nudj/components')

const Layout = require('../../components/app-layout')
const Main = require('../../components/main')
const Section = require('../../components/section')
const ListApplications = require('../../components/list-applications')
const { Heading, Para } = require('../../components/app')
const ButtonLink = require('../../components/button-link')
const { emailPreferences } = require('../../lib/constants')
const analytics = require('../../lib/browser-analytics')

const style = require('./style.css')

const getGmailFriendlyAddress = (email) => email.replace(/\+/g, '%2B')

const ApplicationsPage = (props) => {
  const user = get(props, 'app.user')
  const jobs = get(props, 'app.user.hirer.company.jobs', []).sort((a, b) => {
    if (a.status === 'PUBLISHED') return -1
    return 1
  })

  const isGmail = user.emailPreference === emailPreferences.GOOGLE

  const hasApplications = jobs
    .map(job => job.applications.length)
    .filter(applicationsCount => applicationsCount > 0)
    .length > 0

  return (
    <Layout {...props}>
      <Helmet>
        <title>Applications</title>
      </Helmet>
      <Main>
        {hasApplications ? (
          jobs.filter(job => job.applications.length > 0).map(job => (
            <Section key={job.id} width='largeI'>
              <Align
                styleSheet={{
                  root: style.listHeading,
                  left: style.listTitle,
                  right: style.listMeta
                }}
                leftChildren={(
                  <Heading
                    id={job.slug}
                    level={2}
                    style={mss.left}
                    nonsensitive
                  >
                    {job.title}
                  </Heading>
                )}
                rightChildren={(
                  <Text nonsensitive element='div' size='smallIi'>
                    Status: <strong className={css(mss.bold)}>{startCase(job.status.toLowerCase())}</strong>
                    {' - '}
                    Created: <strong className={css(mss.bold)}>{format(job.created, 'DD/MM/YYYY')}</strong>
                  </Text>
                )}
              />
              <Card style={[mss.pa0, mss.mtReg]}>
                <ListApplications
                  applications={job.applications}
                  applicationChild={(props) => props.email && (
                    <EmailButton
                      to={isGmail ? getGmailFriendlyAddress(props.email) : props.email}
                      subject=''
                      body=''
                      gmail={isGmail}
                      target={isGmail ? '_blank' : '_self'}
                      onClick={() => {
                        analytics.track({
                          object: analytics.objects.applicant,
                          action: analytics.actions.applicant.messaged,
                          properties: {
                            applicantId: props.id,
                            method: isGmail ? 'gmail' : 'email'
                          }
                        })
                      }}
                    />
                  )}
                />
              </Card>
            </Section>
          ))
        ) : (
          <Section padding>
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
      </Main>
    </Layout>
  )
}

ApplicationsPage.defaultProps = {
  jobs: []
}

module.exports = ApplicationsPage
