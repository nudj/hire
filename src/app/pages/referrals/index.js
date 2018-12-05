const React = require('react')
const { Helmet } = require('react-helmet')
const { List, Align, Text, Icon } = require('@nudj/components')
const { css, mss } = require('@nudj/components/styles')
const { possessiveCase } = require('@nudj/library')

const Layout = require('../../components/app-layout')
const ButtonLink = require('../../components/button-link')
const Section = require('../../components/section')
const TitleCard = require('../../components/title-card')
const { Heading, Para } = require('../../components/app')
const { fetchName } = require('../../lib')

const style = require('./style.css')

const ReferralsPage = props => {
  const { user, parent, hirerTypes } = props
  const { hirer } = props.user
  const { jobs } = hirer.company
  const isAdmin = hirer.type === hirerTypes.ADMIN
  const isChildReferralList = !!parent
  const parentBelongsToHirer = parent && parent.person.id === user.id

  let title
  let intro
  switch (true) {
    case parentBelongsToHirer:
      title = 'Links generated'
      intro = <Text element='p' style={style.descriptionParagraph}>
        These links were generated from <span className={css(mss.bold)}>your</span> referral for the role <span className={css(mss.bold)}>{parent.job.title}</span>.
      </Text>
      break
    case isChildReferralList:
      title = `${possessiveCase(fetchName(parent.person))} referrals`
      intro = <Text element='p' style={style.descriptionParagraph}>
        These links were generated from <span className={css(mss.bold)}>{possessiveCase(fetchName(parent.person))} ({parent.person.email})</span> referral for the role <span className={css(mss.bold)}>{parent.job.title}</span>.
      </Text>
      break
    case isAdmin:
      title = 'All referral links'
      intro = <Text element='p' style={style.descriptionParagraph}>
        See how many unique referral links have been created for each job. Make sure you send out more referral requests if activity on any of the jobs is low.
      </Text>
      break
    default:
      title = 'Your referral links'
      intro = <Text element='p' style={style.descriptionParagraph}>
        These are your referral links to share with your network.
      </Text>
  }

  const jobsWithReferrals = jobs.filter(job => job.referrals.length)

  return (
    <Layout {...props}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {jobsWithReferrals.length ? (
        <div>
          <TitleCard title={title}>
            {intro}
          </TitleCard>
          {isAdmin || parent ? (
            // user is admin or showing child referrals list
            jobsWithReferrals.map(job => {
              return (
                <div key={job.slug} className={css(style.listHeading)}>
                  {!parent && <Heading
                    id={job.slug}
                    level={2}
                    style={style.heading}
                    nonsensitive
                  >
                    {job.title}
                  </Heading>}
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
            })
          ) : (
            // non admin top level referrals
            <List style={mss.mtReg}>
              {ListItem => jobsWithReferrals.map(job => {
                const referral = job.referrals[0]
                return (
                  <ListItem key={referral.id} joined>
                    <a className={css(style.card)} href={`/referrals/${referral.id}`}>
                      <Align
                        leftChildren={(
                          <div>
                            <div className={css(style.titleContainer)}>
                              <Text element='div' size='largeI' style={style.title} nonsensitive>
                                {job.title}
                              </Text>
                            </div>
                          </div>
                        )}
                        rightChildren={(
                          <Icon style={style.chevron} name='chevron' />
                        )}
                      />
                    </a>
                  </ListItem>
                )
              })}
            </List>
          )}
        </div>
      ) : (
        <Section style={[mss.center, mss.mtReg]}>
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
