const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')
const URLSearchParams = require('url-search-params')
const { Link } = require('react-router-dom')
const isEqual = require('lodash/isEqual')
let memoize = require('memoize-one')
memoize = memoize.default || memoize

const { Card, Statistic } = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')
const mss = require('@nudj/components/lib/css/modifiers.css')
const { getJobUrl, getReferralUrl } = require('@nudj/library')

const { render } = require('../../lib/templater')
const Layout = require('../../components/app-layout')
const Main = require('../../components/main')
const Section = require('../../components/section')
const ButtonLink = require('../../components/button-link')
const ShareableJob = require('../../components/shareable-job')
const { emailPreferences, memberTypes } = require('../../lib/constants')

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
    id,
    name,
    jobTitle,
    company,
    referralUrl,
    nudjLinkComponent,
    gmail
  } = args

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
      body: encodeURI(parseTemplate(
        emailTemplate.message,
        {
          name,
          referralUrl,
          jobTitle,
          company
        }
      ))
    }
  }
}

class DashboardPage extends React.Component {
  getSharePropsGetters = memoize(
    jobs => jobs.reduce((map, job) => {
      map[job.id] = memoize(getIndividualShareProps, isEqual)
      return map
    }, {})
  )

  render () {
    const { user, location, whatsappTemplate, emailTemplate, twitterTemplate } = this.props
    const memberType = get(user, 'hirer.type', memberTypes.MEMBER)
    const company = get(user, 'hirer.company', {})
    const jobs = get(company, 'jobs', [])

    const getShareProps = this.getSharePropsGetters(jobs)
    const queryParams = new URLSearchParams(get(location, 'search', ''))

    const {
      totalViewCount,
      totalReferralCount,
      totalApplicationCount,
      pastTotalViewCount,
      pastTotalReferralCount,
      pastTotalApplicationCount
    } = jobs.reduce((counts, job) => ({
      totalViewCount: counts.totalViewCount + job.viewCount,
      totalReferralCount: counts.totalReferralCount + job.referralCount,
      totalApplicationCount: counts.totalApplicationCount + job.applicationCount,
      pastTotalViewCount: counts.pastTotalViewCount + job.pastViewCount,
      pastTotalReferralCount: counts.pastTotalReferralCount + job.pastReferralCount,
      pastTotalApplicationCount: counts.pastTotalApplicationCount + job.pastApplicationCount
    }), {
      totalViewCount: 0,
      totalReferralCount: 0,
      totalApplicationCount: 0,
      pastTotalViewCount: 0,
      pastTotalReferralCount: 0,
      pastTotalApplicationCount: 0
    })

    const selectedPeriod = queryParams.get('period')

    return (
      <Layout {...this.props}>
        <Helmet>
          <title>Jobs</title>
        </Helmet>
        <Main>
          <Section padding>
            <div className={css(style.durationButtonGroup)}>
              <ButtonLink
                nonsensitive
                style={[
                  style.durationButton,
                  selectedPeriod === 'week' && style.durationButtonActive
                ]}
                href={`/?period=week`}
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
                href={`/?period=month`}
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
                label='Referrals'
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
            { jobs.map(job => {
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
                referralUrl,
                id: job.id,
                name: user.firstName,
                jobTitle: job.title,
                company: company.name,
                nudjLinkComponent: Link,
                gmail: user.emailPreference === emailPreferences.GOOGLE
              })

              return (
                <Card key={job.id} style={jobCardStyle}>
                  <ShareableJob
                    title={job.title}
                    location={job.location}
                    viewCount={job.viewCount}
                    referralCount={job.referralCount}
                    applicationCount={job.applicationCount}
                    jobUrl={jobUrl}
                    referralUrl={referralUrl}
                    applicantsUrl={
                      memberType === memberTypes.ADMIN
                        ? `/applications#${job.slug}`
                        : undefined
                    }
                    shareProps={shareProps}
                  />
                </Card>
              )
            }) }
          </Section>
        </Main>
      </Layout>
    )
  }
}

module.exports = DashboardPage
