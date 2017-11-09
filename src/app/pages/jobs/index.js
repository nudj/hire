const React = require('react')
const get = require('lodash/get')
const format = require('date-fns/format')
const { Helmet } = require('react-helmet')
const getStyle = require('./style.css')
const LayoutPage = require('../../components/layout-page')
const Link = require('../../components/link/link')
const RowItem = require('../../components/row-item/row-item')

const JobsPage = (props) => {
  const style = getStyle()
  const company = get(props, 'user.hirer.company')
  const jobs = get(company, 'jobs', [])
  const headerProps = {
    title: 'Jobs',
    subtitle: `@ ${get(company, 'name')}`,
    children: <button className={style.upload} id='open-intercom'>Upload job</button>
  }

  return (
    <LayoutPage {...props} header={headerProps} headline={`You currently have ${jobs.length} job${jobs.length === 1 ? '' : 's'} listed on nudj`}>
      <Helmet>
        <title>{`nudj - Jobs @ ${get(company, 'name')}`}</title>
      </Helmet>
      <ul className={style.jobs}>
        {jobs.map((job) => {
          const hasSent = !![].concat(get(job, 'internalMessages', []), get(job, 'externalMessages', [])).length
          const label = hasSent ? 'View job activity' : 'Get nudj\'ing'
          return (<RowItem
            key={get(job, 'slug')}
            title={get(job, 'title')}
            uri={`//${get(props, 'web.hostname')}/jobs/${get(company, 'slug')}+${get(job, 'slug')}`}
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
    </LayoutPage>
  )
}

module.exports = JobsPage
