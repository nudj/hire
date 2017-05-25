const React = require('react')
const { Link } = require('react-router-dom')
const get = require('lodash/get')
const ClipboardButton = require('react-clipboard.js')
const getStyle = require('./job-page.css')
const PageHeader = require('../page-header/page-header')

const JobPage = (props) => {
  let style = getStyle()
  return (
    <div className={style.pageBody}>
      <PageHeader
        title={get(props, 'job.title')}
        subtitle={<span>@ <Link to={'/jobs'}>{get(props, 'company.name')}</Link></span>}
      >
        <ClipboardButton className={style.copyLink} data-clipboard-text={`//nudj.co/${get(props, 'company.slug')}+${get(props, 'job.slug')}`}>Copy job link</ClipboardButton>
      </PageHeader>
      <h3 className={style.pageHeadline}>Who would you like to ask first?</h3>
      <div className={style.pageContent}>
        <div className={style.pageMain}>
          <Link to={`/jobs/${get(props, 'job.slug')}/internal`}>Internal</Link>
          <Link to={`/jobs/${get(props, 'job.slug')}/external`} disabled>External</Link>
        </div>
        <div className={style.pageSidebar}>
          Sidebar yo
        </div>
      </div>
    </div>
  )
}

module.exports = JobPage
