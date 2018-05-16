const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')
const { format } = require('date-fns')
const startCase = require('lodash/startCase')

const { buttonStyleSheet } = require('@nudj/components/lib/components/inline-action/style.css')
const mss = require('@nudj/components/lib/css/modifiers.css')
const { css } = require('@nudj/components/lib/css')
const { Align, Card, Icon, Text } = require('@nudj/components')

const Layout = require('../../components/app-layout')
const Main = require('../../components/main')
const Section = require('../../components/section')
const ListApplications = require('../../components/list-applications')
const { Heading, Para } = require('../../components/app')
const ButtonLink = require('../../components/button-link')

const style = require('./style.css')

const getGmailUrl = (email) => `https://mail.google.com/mail/?view=cm&ui=2&tf=0&fs=1&to=${encodeURI(email)}`

const ApplicationsPage = (props) => {
  const user = get(props, 'app.user')
  const jobs = get(props, 'app.user.hirer.company.jobs', []).sort((a, b) => {
    if (a.status === 'PUBLISHED') return -1
    return 1
  })

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
                  <Heading nonsensitive level={2} style={mss.left}>
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
                  onItemClick={({ value }) => {
                    const email = value.person.email
                    const url = user.emailPreference === 'GOOGLE'
                      ? getGmailUrl(email)
                      : `mailto:${email}`

                    window.open(url, '_blank')
                  }}
                  applicationChild={(props) => props.email && (
                    <span
                      className={css(
                        buttonStyleSheet.root,
                        buttonStyleSheet.murmur,
                        style.messageButton
                      )}
                    >
                      <Icon name='email' />
                    </span>
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
              To get applications, you&apos;ll need to send some messages. How else will anyone know about your jobs?
            </Para>
            <div className={css(mss.center)}>
              <ButtonLink
                nonsensitive
                href='/contacts'
                style={mss.mtLgI}
                name='emailProvider'
                volume='cheer'
                subtle
              >
                Start a conversation
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
