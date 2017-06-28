const React = require('react')
const { Redirect } = require('react-router')
const { Link } = require('react-router-dom')
const get = require('lodash/get')
const isEqual = require('lodash/isEqual')
const { Helmet } = require('react-helmet')
const getStyle = require('./job-page.css')
const PageHeader = require('../page-header/page-header')
const Tooltip = require('../tooltip/tooltip')
const CopyToClipboard = require('../copy-to-clipboard/copy-to-clipboard')
const RowItem = require('../row-item/row-item')

function renderSentListItem ({jobSlug, person, index, style}) {
  const personId = get(person, 'id', '')
  const firstName = get(person, 'firstName', '')
  const lastName = get(person, 'lastName', '')
  const source = get(person, 'source', '')

  // internal - how to specify someone?
  const resendLink = source === 'external' ? `/${jobSlug}/external/${get(person, 'id')}` : `/${jobSlug}/internal`
  const resendButton = (<Link className={style.button} to={resendLink}>Resend</Link>)

  return (<RowItem
    key={`${personId}_${index}`}
    rowKey={`${personId}_${index}`}
    title={`${firstName} ${lastName}`}
    details={[{
      description: source
    }]}
    actions={[
      resendButton
    ]}
  />)
}

function renderSentList ({sent, props, style}) {
  const jobSlug = get(props, 'job.slug', '')
  return (<ul className={style.network}>
    {sent.map((person, index) => renderSentListItem({jobSlug, person, index, style}))}
  </ul>)
}

function reduceSentComplete (accumulator, person) {
  if (!Array.isArray(accumulator)) {
    accumulator = [accumulator]
  }

  const exists = accumulator.filter(existing => isEqual(existing, person))

  if (!exists.length) {
    accumulator.push(person)
  }

  return accumulator
}

const JobPage = (props) => {
  const style = getStyle()
  const tooltip = get(props, 'tooltip')

  const sentComplete = get(props, 'sentComplete', [])
  const jobSlug = get(props, 'job.slug', '')
  const nudjLink = `/${jobSlug}/nudj`

  if (!sentComplete.length) {
    return (<Redirect to={nudjLink} push />)
  }

  // We only need one entry for each person
  const sent = sentComplete.length > 1 ? sentComplete.reduce(reduceSentComplete) : sentComplete
  const sentList = renderSentList({sent, props, style})
  const plural = sent.length > 1 ? 'people' : 'person'

  return (
    <div className={style.pageBody}>
      <Helmet>
        <title>{`nudj - ${get(props, 'job.title')} @ ${get(props, 'company.name')}`}</title>
      </Helmet>
      <PageHeader
        title={get(props, 'job.title')}
        subtitle={<span>@ <Link className={style.headerLink} to={'/'}>{get(props, 'company.name')}</Link></span>}
      >
        <CopyToClipboard className={style.copyLink} data-clipboard-text={`https://nudj.co/${get(props, 'company.slug')}+${get(props, 'job.slug')}`}>Copy job link</CopyToClipboard>
        <Link className={style.nudjLink} to={nudjLink}>nudj job</Link>
      </PageHeader>
      <h3 className={style.pageHeadline}>So far you've asked {sent.length} {plural}</h3>
      <div className={style.pageContent}>
        {sentList}
        <div className={style.pageSidebar}>
          {tooltip ? <Tooltip {...tooltip} /> : ''}
        </div>
      </div>
    </div>
  )
}

module.exports = JobPage
