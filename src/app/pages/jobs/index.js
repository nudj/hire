const React = require('react')
const get = require('lodash/get')
const format = require('date-fns/format')
const { Helmet } = require('react-helmet')
const getStyle = require('./style.css')
const LayoutApp = require('../../components/layout-app')
const Link = require('../../components/link/link')
const PageHeader = require('../../components/page-header/page-header')
const RowItem = require('../../components/row-item/row-item')
const Tooltip = require('../../components/tooltip/tooltip')

const JobsPage = (props) => {
  const style = getStyle()
  const jobs = get(props, 'jobs', [])
  const tooltip = get(props, 'tooltip')
  return (
    <LayoutApp {...props} className={style.pageBody}>
      <Helmet>
        <title>{`nudj - Jobs @ ${get(props, 'company.name')}`}</title>
      </Helmet>
      <PageHeader title='Jobs' subtitle={`@ ${get(props, 'company.name')}`}>
        <button className={style.upload} id='open-intercom'>Upload job</button>
      </PageHeader>
      <h3 className={style.pageHeadline}>You currently have {jobs.length} jobs listed on nudj</h3>
      <div className={style.pageContent}>
        <div className={style.pageMain}>
          <ul className={style.jobs}>
            {jobs.map((job) => {
              const hasSent = get(job, 'hasSent', false)
              const label = hasSent ? 'View job activity' : 'Get nudj\'ing'
              return (<RowItem
                key={get(job, 'slug')}
                title={get(job, 'title')}
                uri={`//${get(props, 'web.hostname')}/jobs/${get(props, 'company.slug')}+${get(job, 'slug')}`}
                details={[{
                  term: 'Location',
                  description: get(job, 'location')
                }, {
                  term: 'Added',
                  description: format(get(job, 'created'), 'DD.MM.YYYY')
                }, {
                  term: 'Bonus',
                  description: `£${get(job, 'bonus')}`
                }]}
                actions={[
                  <Link className={style.nudj} to={`/jobs/${get(job, 'slug')}`}>{label}</Link>
                ]}
              />)
            })}
          </ul>
        </div>
        <div className={style.pageSidebar}>
          {tooltip ? <Tooltip {...tooltip} /> : ''}
        </div>
      </div>
    </LayoutApp>
  )
}

module.exports = JobsPage
