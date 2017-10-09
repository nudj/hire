const React = require('react')
const get = require('lodash/get')
const isEqual = require('lodash/isEqual')
const { Helmet } = require('react-helmet')
const { postData } = require('@nudj/framework/actions')

const getStyle = require('./style.css')
const LayoutApp = require('../../components/layout-app')
const Link = require('../../components/link/link')
const PageHeader = require('../../components/page-header/page-header')
const Tooltip = require('../../components/tooltip/tooltip')
const CopyToClipboard = require('../../components/copy-to-clipboard/copy-to-clipboard')

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

function resendExternalMessage ({props, person, jobSlug}) {
  return () => {
    const recipient = get(person, 'id')
    props.dispatch(postData({
      url: `/jobs/${jobSlug}/external`,
      data: { recipient }
    }))
  }
}

function renderSentListItem ({jobSlug, person, index, style, props}) {
  const personId = get(person, 'id', '')

  const firstName = get(person, 'firstName', '')
  const lastName = get(person, 'lastName', '')
  const email = get(person, 'email', '')

  const visibleName = firstName && lastName ? `${firstName} ${lastName}` : email

  const source = get(person, 'source', '')
  const visibleSource = source === 'external' ? 'Network' : 'Team'
  const applications = get(person, 'totalApplications', 0).toString()
  const referrals = get(person, 'totalReferrals', 0).toString()

  // internal - how to specify someone?
  const resendInternalButton = (<Link className={style.button} to={`/jobs/${jobSlug}/internal`}>Resend</Link>)
  const resendExternalButton = (<button className={style.button} onClick={resendExternalMessage({props, person, jobSlug})}>Resend</button>)
  const resendButton = source === 'external' ? resendExternalButton : resendInternalButton
  const actions = source === 'referral' ? '' : resendButton

  let status = 'Message sent'

  if (applications !== '0') {
    status = 'Referred applicant'
  } else if (referrals !== '0') {
    status = 'Added referrer'
  }

  // Need to change this RowItem to use a table or something - alignment and also column headings
  return (<tr className={style.networkRow} key={`${personId}_${index}`}>
    <td className={style.networkCellName}>{visibleName}</td>
    <td className={style.networkCellCapitalise}>{visibleSource}</td>
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
      {sent.map((person, index) => renderSentListItem({jobSlug, person, index, style, props}))}
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
  const jobLink = `https://${get(props, 'web.hostname')}/jobs/${get(props, 'company.slug')}+${get(props, 'job.slug')}`
  const nudjLink = `/jobs/${jobSlug}/nudj`

  // We only need one entry for each person
  const sent = sentComplete.length > 1 ? sentComplete.reduce(reduceSentComplete) : sentComplete
  const sentList = renderSentList({sent, props, style})
  const plural = sent.length === 1 ? 'person' : 'people'

  const jobActivity = renderJobActivities({props, style})

  return (
    <LayoutApp {...props} className={style.pageBody}>
      <Helmet>
        <title>{`nudj - ${get(props, 'job.title')} @ ${get(props, 'company.name')}`}</title>
      </Helmet>
      <PageHeader
        title={get(props, 'job.title')}
        subtitle={<span>@ <Link className={style.headerLink} to={'/'}>{get(props, 'company.name')}</Link></span>}
      >
        <CopyToClipboard className={style.copyLink} data-clipboard-text={jobLink}>Copy job link</CopyToClipboard>
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
    </LayoutApp>
  )
}

module.exports = JobPage
