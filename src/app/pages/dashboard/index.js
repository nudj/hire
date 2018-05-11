const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')
const URLSearchParams = require('url-search-params')

const { Card, Statistic } = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')
const mss = require('@nudj/components/lib/css/modifiers.css')

const Layout = require('../../components/app-layout')
const Main = require('../../components/main')
const Section = require('../../components/section')
const ButtonLink = require('../../components/button-link')
const Job = require('../../components/job')
const style = require('./style.css')

const getJobLink = (web, company, job, referralId) => {
  const url = `${web.protocol}://${web.hostname}/jobs/${company}+${job}`

  if (referralId) return `${url}+${referralId}`

  return url
}

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

const DashboardPage = (props) => {
  const company = get(props, 'user.hirer.company', {})
  const queryParams = new URLSearchParams(get(props, 'location.search', ''))
  const jobs = get(company, 'jobs', [])

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
    <Layout {...props}>
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
          { jobs.map(job => (
            <Card key={job.id} style={style.jobCard}>
              <Job
                title={job.title}
                location={job.location}
                viewCount={job.viewCount}
                referralCount={job.referralCount}
                applicationCount={job.applicationCount}
                jobHref={getJobLink(props.web, company.slug, job.slug)}
                nudjHref={`/contacts/job/${job.id}`}
              />
            </Card>
          )) }
        </Section>
      </Main>
    </Layout>
  )
}

module.exports = DashboardPage
