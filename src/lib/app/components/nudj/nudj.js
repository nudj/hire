const React = require('react')
const { Link } = require('react-router-dom')
const get = require('lodash/get')
const { Helmet } = require('react-helmet')
const getStyle = require('./nudj.css')
const PageHeader = require('../page-header/page-header')
const Tooltip = require('../tooltip/tooltip')
const CopyToClipboard = require('../copy-to-clipboard/copy-to-clipboard')

const JobPage = (props) => {
  const style = getStyle()
  const tooltip = get(props, 'tooltip')
  const jobLink = `https://${get(props, 'web.hostname')}/jobs/${get(props, 'company.slug')}+${get(props, 'job.slug')}`

  return (
    <div className={style.pageBody}>
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
          <form method='post' action={`/jobs/${get(props, 'job.slug')}/internal/send-gmail`}>
            <input type='hidden' name='_csrf' value={props.csrfToken} />
            <input type='hidden' name='to' value='tim@nudj.co' />
            <input type='hidden' name='subject' value='test subject' />
            <input type='hidden' name='body' value='test body' />
            <button>Send email</button>
          </form>
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
    </div>
  )
}

module.exports = JobPage
