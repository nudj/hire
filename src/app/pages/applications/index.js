const React = require('react')
const { Helmet } = require('react-helmet')
const { List, Align, Text, Icon } = require('@nudj/components')
const { css, mss } = require('@nudj/components/styles')

const Layout = require('../../components/app-layout')
const ButtonLink = require('../../components/button-link')
const Section = require('../../components/section')
const TitleCard = require('../../components/title-card')
const { Heading, Para } = require('../../components/app')
const { fetchName } = require('../../lib')

const style = require('./style.css')

const ApplicationsPage = props => {
  const { jobs } = props.user.hirer.company
  const title = 'Applications'
  const jobsWithApplications = jobs.filter(job => job.applications.length)

  return (
    <Layout {...props}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {jobsWithApplications.length ? (
        <div>
          <TitleCard
            title={title}
          >
            <Text element='p' style={style.descriptionParagraph}>
              See who&apos;s applied for your open jobs, check out their profiles and message them from within the app. Make sure you follow up quickly, these candidates won&apos;t hang around for long!
            </Text>
          </TitleCard>
          {jobsWithApplications.map(job => {
            return (
              <div key={job.slug} className={css(style.listHeading)}>
                <Heading
                  id={job.slug}
                  level={2}
                  style={style.heading}
                  nonsensitive
                >
                  {job.title}
                </Heading>
                <List style={mss.mtReg}>
                  {ListItem => job.applications.map(application => (
                    <ListItem key={application.id} joined>
                      <a className={css(style.card)} href={`/applications/${application.id}`}>
                        <Align
                          leftChildren={(
                            <div>
                              <div className={css(style.titleContainer)}>
                                <Text element='div' size='largeI' style={style.title} nonsensitive>
                                  {fetchName(application.person)}
                                </Text>
                              </div>
                              <Text element='span' size='smallI' style={style.subtitle} nonsensitive>
                                {application.person.email}
                              </Text>
                            </div>
                          )}
                          rightChildren={(
                            <Icon style={style.chevron} name='chevron' />
                          )}
                        />
                      </a>
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
