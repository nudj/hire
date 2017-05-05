const React = require('react')
const { connect } = require('react-redux')
const { withRouter } = require('react-router-dom')
const get = require('lodash/get')
const format = require('date-fns/format')
const style = require('./jobs-page.css')

function jobList (props, status) {
  return (
    <ul className={style[status]}>
      {get(props, status, []).map((job) => {
        const added = format(get(job, 'created'), 'DD/MM/YYYY')
        return (
          <li key={job.id} className={style.job}>
            <dl className={style.details}>
              <dt className={style.detailTitleTitle}>Title</dt>
              <dd className={style.detailDetailTitle}>{get(job, 'title')}</dd>
              <dt className={style.detailTitleLocation}>Location</dt>
              <dd className={style.detailDetailLocation}>{get(job, 'location')}</dd>
              <dt className={style.detailTitleAdded}>Added</dt>
              <dd className={style.detailDetailAdded}>{added}</dd>
              <dt className={style.detailTitleBonus}>Nudj Bonus</dt>
              <dd className={style.detailDetailBonus}>£{get(job, 'bonus')}</dd>
            </dl>
            <ul className={style.actions}>
              <li className={style.action}>
                <a href={`//nudj.co/${get(props, 'company.slug')}/${get(job, 'slug')}`}>View</a>
              </li>
              <li className={style.action}>
                <a href={`/${get(props, 'company.slug')}/${get(job, 'slug')}`}>Nudj</a>
              </li>
              <li className={style.action}>
                <form action={`/${get(props, 'company.slug')}/${get(job, 'slug')}/${status === 'archived' ? 'publish' : 'archive'}`} method='POST'>
                  <input type='hidden' name='_csrf' value={get(props, 'csrfToken')} />
                  <button>{status === 'archived' ? 'Publish' : 'Archive'}</button>
                </form>
              </li>
            </ul>
          </li>
        )
      })}
    </ul>
  )
}

const Component = (props) => (
  <div className={style.body}>
    <header>
      <h1>Jobs</h1>
      <h2>@ {get(props, 'company.name')}</h2>
    </header>
    <h3>Published Jobs</h3>
    {jobList(props, 'published')}
    <hr />
    <h3>Archived Jobs</h3>
    {jobList(props, 'archived')}
  </div>
)

const mapStateToProps = (state, props) => Object.assign({}, state.page, props)
const mapDispatchToProps = (dispatch, ownProps) => ({})
module.exports = withRouter(connect(mapStateToProps, mapDispatchToProps)(Component))
