const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')
const URLSearchParams = require('url-search-params')
const { Link } = require('react-router-dom')
const isEqual = require('lodash/isEqual')
let memoize = require('memoize-one')
memoize = memoize.default || memoize

const {
  Button,
  Card,
  Modal,
  Statistic
} = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')
const mss = require('@nudj/components/lib/css/modifiers.css')
const { getJobUrl, getReferralUrl } = require('@nudj/library')

const { render } = require('../../lib/templater')
const Layout = require('../../components/app-layout')
const Main = require('../../components/main')
const Section = require('../../components/section')
const ButtonLink = require('../../components/button-link')
const ShareableJob = require('../../components/shareable-job')
const { Heading, Para } = require('../../components/app')
const { emailPreferences, memberTypes, jobStatuses } = require('../../lib/constants')
const { InviteTeamBanner, GetRewardedBanner } = require('./banners')

const style = require('./style.css')

const getComparatorString = (value, period) => {
  if (period === 'week') return `${value} last week`
  if (period === 'month') return `${value} last month`
  return null
}

const getStatisticDirection = (currentValue, previousValue) => {
  if (currentValue === previousValue) return null
  return currentValue > previousValue ? 'asc' : 'desc'
}

const getStatisticCorrelation = (currentValue, previousValue) => {
  if (currentValue === previousValue) return null
  return currentValue > previousValue ? 'positive' : 'negative'
}

const createHash = require('hash-generator')

const parseTemplate = (template, data) => {
  return render({
    template: template,
    data,
    splitter: createHash(16),
    brify: () => '\n\n'
  })[0].join('')
}

const jobCardStyle = [style.jobCard, mss.mtReg]

const getIndividualShareProps = (args) => {
  const {
    whatsappTemplate,
    twitterTemplate,
    emailTemplate,
    linkedinTemplate,
    id,
    name,
    jobTitle,
    company,
    bonus,
    referralUrl,
    nudjLinkComponent,
    gmail
  } = args

  const emailBody = parseTemplate(
    emailTemplate.message,
    {
      name,
      referralUrl,
      jobTitle,
      company
    }
  )

  return {
    nudj: {
      to: `/contacts/job/${id}`,
      Component: nudjLinkComponent
    },
    whatsapp: {
      text: parseTemplate(
        whatsappTemplate.message,
        {
          referralUrl,
          jobTitle,
          company
        }
      )
    },
    facebook: {
      url: referralUrl
    },
    messenger: {
      link: referralUrl,
      redirectUri: 'https://nudj.co',
      appId: '1945143509142278'
    },
    linkedin: {
      url: referralUrl,
      title: parseTemplate(
        linkedinTemplate.subject,
        {
          job: { title: jobTitle }
        }
      ),
      summary: parseTemplate(
        linkedinTemplate.message,
        {
          job: { title: jobTitle, bonus },
          company: { name: company }
        }
      )
    },
    twitter: {
      text: parseTemplate(
        twitterTemplate.message,
        {
          referralUrl,
          jobTitle,
          company
        }
      ),
      url: referralUrl,
      via: 'nudj'
    },
    email: {
      gmail,
      to: '',
      subject: parseTemplate(
        emailTemplate.subject,
        {
          referralUrl,
          jobTitle,
          company
        }
      ),
      body: gmail ? encodeURI(emailBody) : emailBody
    }
  }
}

class DashboardPage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      showOnboardingSuccessModal: !!props.newlyOnboarded
    }
  }

  getSharePropsGetters = memoize(
    jobs => jobs.reduce((map, job) => {
      map[job.id] = memoize(getIndividualShareProps, isEqual)
      return map
    }, {})
  )

  handleOnboardingSuccessModalClose = () => {
    this.setState({
      showOnboardingSuccessModal: false
    })
  }

  render () {
    const { showOnboardingSuccessModal } = this.state
    const {
      user,
      location,
      whatsappTemplate,
      emailTemplate,
      twitterTemplate,
      linkedinTemplate,
      newlyOnboarded
    } = this.props

    const { hirer, connectionsCount } = user
    const memberType = get(user, 'hirer.type', memberTypes.MEMBER)
    const company = get(user, 'hirer.company', {})
    const jobs = get(company, 'jobs', [])

    const isAdmin = memberType === memberTypes.ADMIN
    const getShareProps = this.getSharePropsGetters(jobs)
    const queryParams = new URLSearchParams(get(location, 'search', ''))
    const invitedCount = get(company, 'hirers', [])
      .filter(item => item.id !== hirer.id)
      .length

    const categoriseJob = (jobs, job) => {
      if (job.status === jobStatuses.PUBLISHED) {
        jobs.publishedJobs = jobs.publishedJobs.concat(job)
      } else if (job.status === jobStatuses.ARCHIVED) {
        jobs.archivedJobs = jobs.archivedJobs.concat(job)
      } else {
        jobs.draftJobs = jobs.draftJobs.concat(job)
      }

      return jobs
    }

    const {
      totalViewCount,
      totalReferralCount,
      totalApplicationCount,
      pastTotalViewCount,
      pastTotalReferralCount,
      pastTotalApplicationCount,
      publishedJobs,
      draftJobs,
      archivedJobs
    } = jobs.reduce((all, job) => ({
      totalViewCount: all.totalViewCount + job.viewCount,
      totalReferralCount: all.totalReferralCount + job.referralCount,
      totalApplicationCount: all.totalApplicationCount + job.applicationCount,
      pastTotalViewCount: all.pastTotalViewCount + job.pastViewCount,
      pastTotalReferralCount: all.pastTotalReferralCount + job.pastReferralCount,
      pastTotalApplicationCount: all.pastTotalApplicationCount + job.pastApplicationCount,
      ...categoriseJob(all, job)
    }), {
      totalViewCount: 0,
      totalReferralCount: 0,
      totalApplicationCount: 0,
      pastTotalViewCount: 0,
      pastTotalReferralCount: 0,
      pastTotalApplicationCount: 0,
      publishedJobs: [],
      draftJobs: [],
      archivedJobs: []
    })

    const selectedPeriod = queryParams.get('period')
    const renderInviteTeamBanner = isAdmin && invitedCount < 5 && !newlyOnboarded
    const renderGetRewardedBanner = !isAdmin && connectionsCount < 1

    const orderByDate = jobs => jobs.sort((a, b) => (
      new Date(a.created) - new Date(b.created)
    ))

    const allJobs = [
      {
        title: 'Published',
        jobs: orderByDate(publishedJobs)
      },
      {
        title: 'Drafts',
        jobs: orderByDate(draftJobs),
        style: style.draft
      },
      {
        title: 'Archived',
        jobs: orderByDate(archivedJobs),
        style: style.archived
      }
    ]

    return (
      <Layout {...this.props}>
        <Helmet>
          <title>Jobs</title>
        </Helmet>
        <Main>
          { renderInviteTeamBanner && (
            <Section padding>
              <InviteTeamBanner />
            </Section>
          ) }
          { renderGetRewardedBanner && (
            <Section padding>
              <GetRewardedBanner />
            </Section>
          ) }
          <Section padding>
            <div className={css(style.durationButtonGroup)}>
              <ButtonLink
                nonsensitive
                style={[
                  style.durationButton,
                  selectedPeriod === 'week' && style.durationButtonActive
                ]}
                href='/?period=week'
                subtle
                preventReload={false}
              >
                This week
              </ButtonLink>
              <ButtonLink
                nonsensitive
                style={[
                  style.durationButton,
                  selectedPeriod === 'month' && style.durationButtonActive
                ]}
                href='/?period=month'
                subtle
                preventReload={false}
              >
                This month
              </ButtonLink>
              <ButtonLink
                nonsensitive
                style={[
                  style.durationButton,
                  !selectedPeriod && style.durationButtonActive
                ]}
                href='/'
                subtle
                preventReload={false}
              >
                All time
              </ButtonLink>
            </div>
          </Section>
          <Section style={style.statisticsList} padding>
            <Card style={style.statisticItem}>
              <Statistic
                nonsensitive
                styleSheet={{ root: mss.fgPrimary }}
                value={totalViewCount}
                label='Page views'
                direction={getStatisticDirection(totalViewCount, pastTotalViewCount)}
                correlation={getStatisticCorrelation(totalViewCount, pastTotalViewCount)}
                comparator={getComparatorString(pastTotalViewCount, selectedPeriod)}
              />
            </Card>
            <Card style={style.statisticItem}>
              <Statistic
                nonsensitive
                styleSheet={{ root: mss.fgPrimary }}
                value={totalReferralCount}
                label='Links created'
                direction={getStatisticDirection(totalReferralCount, pastTotalReferralCount)}
                correlation={getStatisticCorrelation(totalReferralCount, pastTotalReferralCount)}
                comparator={getComparatorString(pastTotalReferralCount, selectedPeriod)}
              />
            </Card>
            <Card style={style.statisticItem}>
              <Statistic
                nonsensitive
                styleSheet={{ root: mss.fgPrimary }}
                value={totalApplicationCount}
                label='Applications'
                direction={getStatisticDirection(totalApplicationCount, pastTotalApplicationCount)}
                correlation={getStatisticCorrelation(totalApplicationCount, pastTotalApplicationCount)}
                comparator={getComparatorString(pastTotalApplicationCount, selectedPeriod)}
              />
            </Card>
          </Section>
          <Section padding>
            {
              allJobs.map(jobGroup => {
                if (!jobGroup.jobs.length) return null
                return (
                  <div className={css(style.jobGroup)} key={jobGroup.title}>
                    <div className={css(style.actions)}>
                      <Heading
                        level={2}
                        style={style.statusHeader}
                        nonsensitive
                      >
                        {jobGroup.title}
                      </Heading>
                      {allJobs.indexOf(jobGroup) === 0 && isAdmin && (
                        <ButtonLink
                          style={style.addJobButton}
                          volume='cheer'
                          to='/jobs/new'
                          subtle
                        >
                          Add job
                        </ButtonLink>
                      )}
                    </div>
                    {jobGroup.jobs.map(job => {
                      const jobUrl = getJobUrl({
                        protocol: this.props.web.protocol,
                        hostname: this.props.web.hostname,
                        company: company.slug,
                        job: job.slug
                      })

                      const referralUrl = getReferralUrl({
                        protocol: this.props.web.protocol,
                        hostname: this.props.web.hostname,
                        referralId: job.referral.id
                      })

                      const shareProps = getShareProps[job.id]({
                        whatsappTemplate,
                        twitterTemplate,
                        emailTemplate,
                        linkedinTemplate,
                        referralUrl,
                        bonus: job.bonus,
                        id: job.id,
                        name: user.firstName,
                        jobTitle: job.title,
                        company: company.name,
                        nudjLinkComponent: Link,
                        gmail: user.emailPreference === emailPreferences.GOOGLE
                      })

                      return (
                        <Card key={job.id} style={[jobCardStyle, jobGroup.style]}>
                          <ShareableJob
                            showEdit={isAdmin}
                            title={job.title}
                            slug={job.slug}
                            status={job.status}
                            location={job.location}
                            viewCount={job.viewCount}
                            referralCount={job.referralCount}
                            applicationCount={job.applicationCount}
                            jobUrl={jobUrl}
                            referralUrl={referralUrl}
                            bonus={job.bonus}
                            applicantsUrl={
                              isAdmin
                                ? `/applications#${job.slug}`
                                : undefined
                            }
                            shareProps={shareProps}
                          />
                        </Card>
                      )
                    })}
                  </div>
                )
              })
            }
          </Section>
        </Main>
        <Modal
          isOpen={showOnboardingSuccessModal}
          shouldCloseOnOverlayClick
          shouldCloseOnEsc
          onRequestClose={this.handleOnboardingSuccessModalClose}
          style={mss.center}
        >
          { isAdmin ? (
            <div>
              <Heading
                nonsensitive
                level={2}
                size='largeIi'
                style={mss.fgPrimary}
              >
                Nice one, you&apos;re all set up!
              </Heading>
              <img
                className={css(mss.mtLgIi)}
                src='/assets/images/fist-bump.svg'
                alt=''
              />
              <Para nonsensitive>
                We&apos;ve created your company and posted your job to our
                platform
              </Para>
              <Para nonsensitive>
                You can now explore the rest of the app, add more jobs and,
                when you&apos;re ready, send out invites to your team so
                they can start getting the word out.
              </Para>
              <div className={css(style.buttonGroup)}>
                <Button
                  nonsensitive
                  style={style.button}
                  onClick={this.handleOnboardingSuccessModalClose}
                  volume='cheer'
                >
                  Ok, great!
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <Heading
                nonsensitive
                level={2}
                size='largeIi'
                style={mss.fgPrimary}
              >
                Thanks for sharing!
              </Heading>
              <img
                className={css(mss.mtLgIi)}
                src='/assets/images/fist-bump.svg'
                alt=''
              />
              <Para nonsensitive>
                Great work on sharing your company&apos;s jobs. We&apos;ll be sure
                to let you know when someone applies.
              </Para>
              <Para nonsensitive>
                In the meantime, if you want to share your unique links again,
                simply click 'Share job' under each job.
              </Para>
              <div className={css(style.buttonGroup)}>
                <Button
                  nonsensitive
                  style={style.button}
                  onClick={this.handleOnboardingSuccessModalClose}
                  volume='cheer'
                >
                  Got it!
                </Button>
              </div>
            </div>
          ) }
        </Modal>
      </Layout>
    )
  }
}

module.exports = DashboardPage
