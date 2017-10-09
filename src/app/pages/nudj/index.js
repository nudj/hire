const React = require('react')
const get = require('lodash/get')
const { Helmet } = require('react-helmet')

const getStyle = require('./style.css')
const LayoutApp = require('../../components/layout-app')
const Link = require('../../components/link/link')
const PageHeader = require('../../components/page-header/page-header')
const Tooltip = require('../../components/tooltip/tooltip')
const CopyToClipboard = require('../../components/copy-to-clipboard/copy-to-clipboard')

const JobPage = (props) => {
  const style = getStyle()
  const tooltip = get(props, 'tooltip')
  const jobLink = `https://${get(props, 'web.hostname')}/jobs/${get(props, 'company.slug')}+${get(props, 'job.slug')}`

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
      </PageHeader>
      <h3 className={style.pageHeadline}>Who would you like to ask first?</h3>
      <div className={style.pageContent}>
        <div className={style.pageMain}>
          <div className={style.internal}>
            <div className={style.internalContent}>
              <h4 className={style.title}>Ask your company</h4>
              <p className={style.description}>Encourage your team to explore their networks, make recommendations and get your job out there.</p>
            </div>
            <Link className={style.button} to={`/jobs/${get(props, 'job.slug')}/internal`}>Select</Link>
          </div>
          <div className={style.external}>
            <div className={style.externalContent}>
              <h4 className={style.title}>Ask your network</h4>
              <p className={style.description}>We've identified key people from your network that will ensure your job gets in front of the best candidates.</p>
            </div>
            <Link className={style.button} to={`/jobs/${get(props, 'job.slug')}/external`}>Select</Link>
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