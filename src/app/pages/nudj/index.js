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
      />
      <h3 className={style.pageHeadline}>What would you like to do?</h3>
      <div className={style.pageContent}>
        <div className={style.pageMain}>
          <div className={style.internal}>
            <div className={style.internalContent}>
              <h4 className={style.title}>Send a one-off email</h4>
              <p className={style.description}>Send a one-off email about the role, which contains all the key information anyone will ever need to find someone great.</p>
            </div>
            <Link className={style.button} to={`/jobs/${get(props, 'job.slug')}/internal`}>Send email</Link>
          </div>
          <div className={style.external}>
            <div className={style.externalContent}>
              <h4 className={style.title}>View our recommendations</h4>
              <p className={style.description}>See who we've indentified in your network that can help you in your search &amp; craft a message that will get them to take action.</p>
            </div>
            <Link className={style.button} to={`/jobs/${get(props, 'job.slug')}/external`}>View recommendations</Link>
          </div>
          <div className={style.copy}>
            <div className={style.copyContent}>
              <h4 className={style.title}>Share the job page</h4>
              <p className={style.description}>Keep it simple and copy a link to the public job page, so you can send to whoever you want however you want.</p>
            </div>
            <CopyToClipboard className={style.button} data-clipboard-text={jobLink}>Copy link</CopyToClipboard>
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
