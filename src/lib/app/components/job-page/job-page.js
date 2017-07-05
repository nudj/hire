const React = require('react')
const { Redirect } = require('react-router')
const { Link } = require('react-router-dom')
const get = require('lodash/get')
const isEqual = require('lodash/isEqual')
const { Helmet } = require('react-helmet')
const getStyle = require('./job-page.css')
const PageHeader = require('../page-header/page-header')
const Tooltip = require('../tooltip/tooltip')
const CopyToClipboard = require('../copy-to-clipboard/copy-to-clipboard')
const RowItem = require('../row-item/row-item')

function renderJobActivitiy ({activity, style}) {
  let trendStyle = style.jobActivityHighlightPositive

  if (activity.trend === -1) {
    trendStyle = style.jobActivityHighlightNegative
  } else if (activity.trend === 0) {
    trendStyle = style.jobActivityHighlightNeutral
  }

  return (<div className={style.jobActivity}>
    <h4 className={style.jobActivityTitle}>{activity.title}</h4>
    <p className={style.jobActivitySummary}><span className={trendStyle}>{activity.thisWeek}</span> in the last week</p>
    <p className={style.jobActivityFooter}>{activity.total} in total</p>
  </div>)
}

function getActivityData (title, data) {
  const activityData = {
    title: title,
    thisWeek: data.thisWeek,
    total: data.total,
    trend: data.trend
  }
  return activityData
}

function getActivitesData ({props}) {
  const pageViewData = get(props, 'activities.pageViews', {})
  const referrerData = get(props, 'activities.referrers', {})
  const applicationData = get(props, 'activities.applications', {})

  const pageViews = getActivityData('Page views', pageViewData)
  const referrers = getActivityData('Referrers', referrerData)
  const applications = getActivityData('Applications', applicationData)

  return {pageViews, referrers, applications}
}

function renderJobActivities ({props, style}) {
  const {referrers, applications} = getActivitesData({props})

  return (<div className={style.jobActivities}>
    {renderJobActivitiy({ activity: referrers, style })}
    {renderJobActivitiy({ activity: applications, style })}
  </div>)
}

function renderSentListItem ({jobSlug, person, index, style}) {
  const personId = get(person, 'id', '')
  const firstName = get(person, 'firstName', '')
  const lastName = get(person, 'lastName', '')
  const source = get(person, 'source', '')
  const applications = get(person, 'totalApplications', 0).toString()
  const referrals = get(person, 'totalReferrals', 0).toString()

  // internal - how to specify someone?
  const resendLink = source === 'external' ? `/${jobSlug}/external/${get(person, 'id')}` : `/${jobSlug}/internal`
  const resendButton = (<Link className={style.button} to={resendLink}>Resend</Link>)
  const actions = source === 'referral' ? [] : [resendButton]

  let status = '🤷‍'

  if (applications !== '0') {
    status = 'Referred applicant'
  } else if (referrals !== '0') {
    status = 'Added referrer'
  }

  // Need to change this RowItem to use a table or something - alignment and also column headings
  return (<tr className={style.networkRow} key={`${personId}_${index}`}>
    <td className={style.networkCellName}>{`${firstName} ${lastName}`}</td>
    <td className={style.networkCellCapitalise}>{source}</td>
    <td className={style.networkCell}>{status}</td>
    <td className={style.networkCell}>{referrals}</td>
    <td className={style.networkCell}>{applications}</td>
    <td className={style.networkCellActions}>{actions}</td>
  </tr>)
}

function renderSentList ({sent, props, style}) {
  const jobSlug = get(props, 'job.slug', '')
  return (<table className={style.network}>
    <thead>
      <tr className={style.networkRow}>
        <th className={style.networkHead}>Name</th>
        <th className={style.networkHead}>Source</th>
        <th className={style.networkHead}>Status</th>
        <th className={style.networkHead}>Referrals</th>
        <th className={style.networkHead}>Applications</th>
        <th className={style.networkHead} />
      </tr>
    </thead>
    <tbody>
      {sent.map((person, index) => renderSentListItem({jobSlug, person, index, style}))}
    </tbody>
  </table>)
}

function reduceSentComplete (accumulator, person) {
  if (!Array.isArray(accumulator)) {
    accumulator = [accumulator]
  }

  const exists = accumulator.filter(existing => isEqual(existing, person))

  if (!exists.length) {
    accumulator.push(person)
  }

  return accumulator
}

const JobPage = (props) => {
  const style = getStyle()
  const tooltip = get(props, 'tooltip')

  const sentComplete = get(props, 'sentComplete', [])
  const jobSlug = get(props, 'job.slug', '')
  const nudjLink = `/${jobSlug}/nudj`

  if (!sentComplete.length) {
    return (<Redirect to={nudjLink} push />)
  }

  // We only need one entry for each person
  const sent = sentComplete.length > 1 ? sentComplete.reduce(reduceSentComplete) : sentComplete
  const sentList = renderSentList({sent, props, style})
  const plural = sent.length === 1 ? 'person' : 'people'

  const jobActivity = renderJobActivities({props, style})

  return (
    <div className={style.pageBody}>
      <Helmet>
        <title>{`nudj - ${get(props, 'job.title')} @ ${get(props, 'company.name')}`}</title>
      </Helmet>
      <PageHeader
        title={get(props, 'job.title')}
        subtitle={<span>@ <Link className={style.headerLink} to={'/'}>{get(props, 'company.name')}</Link></span>}
      >
        <CopyToClipboard className={style.copyLink} data-clipboard-text={`https://nudj.co/${get(props, 'company.slug')}+${get(props, 'job.slug')}`}>Copy job link</CopyToClipboard>
        <Link className={style.nudjLink} to={nudjLink}>nudj job</Link>
      </PageHeader>
      <div className={style.pageContent}>
        <div className={style.pageMainContainer}>
          <h3 className={style.pageHeadline}>Job activity</h3>
          <div className={style.pageMain}>
            {jobActivity}
          </div>
          <hr className={style.sectionDivider} />
          <h3 className={style.pageHeadline}>So far you've asked {sent.length} {plural}</h3>
          <div className={style.pageMain}>
            {sentList}
          </div>
        </div>
        <div className={style.pageSidebar}>
          {tooltip ? <Tooltip {...tooltip} /> : ''}
        </div>
      </div>
    </div>
  )
}

module.exports = JobPage
