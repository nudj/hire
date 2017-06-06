const React = require('react')
const { Link } = require('react-router-dom')
const get = require('lodash/get')
const getStyle = require('./job-page.css')
const PageHeader = require('../page-header/page-header')
const Tooltip = require('../tooltip/tooltip')
const CopyToClipboard = require('../copy-to-clipboard/copy-to-clipboard')

const JobPage = (props) => {
  const style = getStyle()
  const tooltip = get(props, 'tooltip')
  return (
    <div className={style.pageBody}>
      <PageHeader
        title={get(props, 'job.title')}
        subtitle={<span>@ <Link className={style.headerLink} to={'/'}>{get(props, 'company.name')}</Link></span>}
      >
        <CopyToClipboard className={style.copyLink} data-clipboard-text={`//nudj.co/${get(props, 'company.slug')}+${get(props, 'job.slug')}`}>Copy job link</CopyToClipboard>
      </PageHeader>
      <h3 className={style.pageHeadline}>Who would you like to ask first?</h3>
      <div className={style.pageContent}>
        <div className={style.pageMain}>
          <div className={style.internal}>
            <div className={style.internalContent}>
              <h4 className={style.title}>Ask your company</h4>
              <p className={style.description}>Encourage your team to explore their networks, make recommendations and get your job out there.</p>
            </div>
            <Link className={style.button} to={`/${get(props, 'job.slug')}/internal`}>Select</Link>
          </div>
          <div className={style.external}>
            <div className={style.externalContent}>
              <h4 className={style.title}>Ask your network</h4>
              <p className={style.description}>We've identified key people from your network that will ensure your job gets in front of the best candidates.</p>
            </div>
            <Link className={style.button} to={`/${get(props, 'job.slug')}/external`}>Select</Link>
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
