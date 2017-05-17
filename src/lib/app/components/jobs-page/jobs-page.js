const React = require('react')
const { Link } = require('react-router-dom')
const get = require('lodash/get')
const format = require('date-fns/format')
const ClipboardButton = require('react-clipboard.js')
const getStyle = require('./jobs-page.css')
const PageHeader = require('../page-header/page-header')
const RowItem = require('../row-item/row-item')

const JobsPage = (props) => {
  const style = getStyle()
  let jobs = get(props, 'published', [])
  return (
    <div className={style.body}>
      <PageHeader title='Jobs' subtitle={get(props, 'company.name')}>
        <button className={style.upload}>Upload job</button>
      </PageHeader>
      <h3 className={style.headline}>You currently have {jobs.length} jobs listed on nudj...</h3>
      <div className={style.content}>
        <div className={style.main}>
          <ul className={style.jobs}>
            {jobs.map((job) => (
              <RowItem
                key={get(job, 'slug')}
                title={get(job, 'title')}
                uri={`//nudj.co/${get(props, 'company.slug')}+${get(job, 'slug')}`}
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
                  <ClipboardButton data-clipboard-text={`//nudj.co/${get(props, 'company.slug')}+${get(job, 'slug')}`}>Copy link</ClipboardButton>,
                  <Link to={`/jobs/${get(job, 'slug')}`}>Nudj</Link>
                ]}
              />
            ))}
          </ul>
        </div>
        <div className={style.sidebar}>
          <aside className={style.tip}>
            <h1 className={style.tipTitle}>Welcome!</h1>
            <p className={style.tipParagraph}>To save you time, all your jobs have already been uploaded. You can start seeking referrals by selecting 'nudj'.</p>
            <p className={style.tipParagraph}>Alternatively, you can copy a trackable link to each job or view the live job page by clicking on the job title.</p>
            <p className={style.tipParagraph}>If you need to remove or edit anything please get in touch.</p>
          </aside>
        </div>
      </div>
    </div>
  )
}

module.exports = JobsPage
