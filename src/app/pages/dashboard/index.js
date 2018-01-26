const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')
const URLSearchParams = require('url-search-params')
const {
  format,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth
} = require('date-fns')

const { Card, Statistic } = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')
const mss = require('@nudj/components/lib/css/modifiers.css')

const Layout = require('../../components/app-layout')
const Main = require('../../components/main')
const Section = require('../../components/section')
const ButtonLink = require('../../components/button-link')
const { Heading } = require('../../components/app')
const JobPerformance = require('../../components/job-performance')
const style = require('./style.css')

const getJobLink = (web, company, job, referralId) => {
  const url = `${web.protocol}://${web.hostname}/jobs/${company}+${job}`

  if (referralId) return `${url}+${referralId}`

  return url
}

class DashboardPage extends React.Component {
  state = {
    hasRendered: false
  }

  componentDidMount () {
    this.setState({ hasRendered: true })
  }

  render () {
    const { hasRendered } = this.state
    const company = get(this.props, 'user.hirer.company', {})
    const queryParams = new URLSearchParams(get(this.props, 'location.search', ''))
    const jobs = get(company, 'jobs', [])

    const totalViewCount = jobs.reduce((count, job) =>
      count + job.viewCount,
      0
    )

    const totalReferralCount = jobs.reduce((count, job) =>
      count + job.referralCount,
      0
    )

    const totalApplicationCount = jobs.reduce((count, job) =>
      count + job.applicationCount,
      0
    )

    const now = new Date()
    // Prevents SSR of dates to prevent checksum differences
    const weekStartDate = hasRendered
      ? format(startOfWeek(now, { weekStartsOn: 1 }), 'YYYY-MM-DD')
      : ''
    const weekEndDate = hasRendered
      ? format(endOfWeek(now, { weekStartsOn: 1 }), 'YYYY-MM-DD')
      : ''
    const monthStartDate = hasRendered
      ? format(startOfMonth(now), 'YYYY-MM-DD')
      : ''
    const monthEndDate = hasRendered
      ? format(endOfMonth(now), 'YYYY-MM-DD')
      : ''

    const allTimeSelected = !queryParams.get('startDate') && !queryParams.get('endDate')
    const thisWeekSelected = weekStartDate === queryParams.get('startDate') && weekEndDate === queryParams.get('endDate')
    const thisMonthSelected = monthStartDate === queryParams.get('startDate') && monthEndDate === queryParams.get('endDate')

    return (
      <Layout {...this.props}>
        <Helmet>
          <title>Job dashboard</title>
        </Helmet>
        <Main>
          <Section padding>
            <Heading style={mss.fgPrimary}>
              Here is what’s going on across all your jobs
            </Heading>
            <div className={css(mss.mtReg, style.durationButtonGroup)}>
              <ButtonLink
                style={[
                  style.durationButton,
                  thisWeekSelected && style.durationButtonActive
                ]}
                href={`/?startDate=${weekStartDate}&endDate=${weekEndDate}`}
                subtle
                disabled={!hasRendered}
                preventReload={false}
              >
                This week
              </ButtonLink>
              <ButtonLink
                style={[
                  style.durationButton,
                  thisMonthSelected && style.durationButtonActive
                ]}
                href={`/?startDate=${monthStartDate}&endDate=${monthEndDate}`}
                subtle
                disabled={!hasRendered}
                preventReload={false}
              >
                This month
              </ButtonLink>
              <ButtonLink
                style={[
                  style.durationButton,
                  allTimeSelected && style.durationButtonActive
                ]}
                href='/'
                subtle
                disabled={!hasRendered}
                preventReload={false}
              >
                All time
              </ButtonLink>
            </div>
          </Section>
          <Section style={style.statisticsList} padding>
            <Card style={style.statisticItem}>
              <Statistic
                styleSheet={{ root: mss.fgPrimary }}
                value={totalViewCount}
                label='Page views'
              />
            </Card>
            <Card style={style.statisticItem}>
              <Statistic
                styleSheet={{ root: mss.fgPrimary }}
                value={totalReferralCount}
                label='Referrals'
              />
            </Card>
            <Card style={style.statisticItem}>
              <Statistic
                styleSheet={{ root: mss.fgPrimary }}
                value={totalApplicationCount}
                label='Applications'
              />
            </Card>
          </Section>
          <Section padding>
            { jobs.map(job => (
              <Card key={job.id}>
                <JobPerformance
                  title={job.title}
                  location={job.location}
                  viewCount={job.viewCount}
                  referralCount={job.referralCount}
                  applicationCount={job.applicationCount}
                  jobHref={getJobLink(this.props.web, company.slug, job.slug)}
                  nudjHref={`/contacts/job/${job.id}`}
                />
              </Card>
            )) }
          </Section>
        </Main>
      </Layout>
    )
  }
}

module.exports = DashboardPage
