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

const ReferralsPage = props => {
  const { jobs } = props.user.hirer.company
  const title = 'Referral links'
  const jobsWithReferrals = jobs.filter(job => job.referrals.length)

  return (
    <Layout {...props}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {jobsWithReferrals.length ? (
        <div>
          <TitleCard
            title={title}
          >
            <Text element='p' style={style.descriptionParagraph}>
              See how many unique referral links have been created for each job. Make sure you send out more referral requests if activity on any of the jobs is low.
            </Text>
          </TitleCard>
          {jobsWithReferrals.map(job => {
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
                  {ListItem => job.referrals.map(referral => (
                    <ListItem key={referral.id} joined>
                      <a className={css(style.card)} href={`/referrals/${referral.id}`}>
                        <Align
                          leftChildren={(
                            <div>
                              <div className={css(style.titleContainer)}>
                                <Text element='div' size='largeI' style={style.title} nonsensitive>
                                  {fetchName(referral.person)}
                                </Text>
                              </div>
                              <Text element='span' size='smallI' style={style.subtitle} nonsensitive>
                                {referral.person.email}
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
            You haven&apos;t received any referrals yet
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

module.exports = ReferralsPage
