const React = require('react')
const { Link } = require('react-router-dom')
const get = require('lodash/get')
const format = require('date-fns/format')
const getStyle = require('./jobs-page.css')
const PageHeader = require('../page-header/page-header')
const RowItem = require('../row-item/row-item')
const Tooltip = require('../tooltip/tooltip')

const JobsPage = (props) => {
  const style = getStyle()
  const jobs = get(props, 'published', [])
  const tooltip = get(props, 'tooltip')
  return (
    <div className={style.pageBody}>
      <PageHeader title='Jobs' subtitle={`@ ${get(props, 'company.name')}`}>
        <button className={style.upload}>Upload job</button>
      </PageHeader>
      <h3 className={style.pageHeadline}>You currently have {jobs.length} jobs listed on nudj...</h3>
      <div className={style.pageContent}>
        <div className={style.pageMain}>
          <ul className={style.jobs}>
            {jobs.map((job) => (
              <RowItem
                key={get(job, 'slug')}
                title={get(job, 'title')}
                uri={`//nudj.co/jobs/${get(props, 'company.slug')}+${get(job, 'slug')}`}
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
                  <Link className={style.nudj} to={`/${get(job, 'slug')}`}>Get started</Link>
                ]}
              />
            ))}
          </ul>
        </div>
        <div className={style.pageSidebar}>
          {tooltip ? <Tooltip {...tooltip} /> : ''}
        </div>
      </div>
    </div>
  )
}

module.exports = JobsPage
