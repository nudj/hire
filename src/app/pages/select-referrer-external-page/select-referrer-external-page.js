const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')
const Link = require('../link/link')
const PageHeader = require('../page-header/page-header')
const RowItem = require('../row-item/row-item')
const Tooltip = require('../tooltip/tooltip')
const { postData } = require('../../actions/app')

const getStyle = require('./select-referrer-external-page.css')

module.exports = class ComposePage extends React.Component {
  constructor (props) {
    super(props)
    this.style = getStyle()

    const tooltips = get(this.props, 'tooltips', [])

    this.state = {tooltips}
    this.onClickSend = this.onClickSend.bind(this)
  }

  onClickSend (person) {
    return () => {
      const jobSlug = get(this.props, 'job.slug', '')
      this.props.dispatch(postData({
        url: `/jobs/${jobSlug}/external`,
        data: {
          recipient: person
        }
      }))
    }
  }

  renderNetworkListRowItem ({buttonClass = this.style.nudjButton, buttonLabel, jobSlug, person, index, url}) {
    const personId = get(person, 'id', '')
    const firstName = get(person, 'firstName', '')
    const lastName = get(person, 'lastName', '')
    const title = get(person, 'title', '')
    const company = get(person, 'company', '')
    const continueButton = <Link className={buttonClass} to={url}>{buttonLabel}</Link>
    const newButton = <button className={buttonClass} onClick={this.onClickSend(personId)}>{buttonLabel}</button>
    let link = newButton

    if (buttonLabel === 'Continue') {
      link = continueButton
    }

    return (<RowItem
      key={`${personId}_${index}`}
      title={`${firstName} ${lastName}`}
      details={[{
        term: 'Job title',
        description: title
      }, {
        term: 'Company',
        description: company
      }]}
      actions={[
        link
      ]}
    />)
  }

  renderNetworkList () {
    const jobSlug = get(this.props, 'job.slug', '')
    const network = get(this.props, 'network', [])
    const networkSaved = get(this.props, 'networkSaved', [])
    const networkSent = get(this.props, 'networkSent', [])
    const externalMessagesIncomplete = get(this.props, 'externalMessagesIncomplete', [])
    const networkUnsent = network.filter(person => !networkSent.includes(person.id))

    if (!network.length || (networkSent.length && !networkUnsent.length)) {
      return (<p className={this.style.copy}>Doesn't look like we could find anyone relevant in your network, but we’ll be sure to notify you as soon as we do.</p>)
    }

    return (<ul className={this.style.network}>
      {network.map((person, index) => {
        const personId = get(person, 'id')
        let url = `/jobs/${jobSlug}/external`
        let buttonLabel = 'Nudj'
        let buttonClass = this.style.nudjButton

        if (networkSent.includes(personId)) {
          return ''
        } else if (networkSaved.includes(personId)) {
          const currentMessage = externalMessagesIncomplete.find((message) => message.recipient === personId)
          url = `${url}/${currentMessage.id}`
          buttonLabel = 'Continue'
          buttonClass = this.style.continueButton
        }

        return this.renderNetworkListRowItem({buttonClass, buttonLabel, jobSlug, person, index, url})
      })}
    </ul>)
  }

  renderNudjNetworkList () {
    const networkSent = get(this.props, 'networkSent', [])
    const nudjNetwork = get(this.props, 'nudjNetwork', [])

    if (!nudjNetwork.length || networkSent.length) {
      return (<p className={this.style.copy}>We haven’t found any more relevant people within the nudj network, however, we will send your job to them as soon as we do.</p>)
    }

    return (<ul className={this.style.networkSmall}>
      {nudjNetwork.map((person, index) => {
        const personId = get(person, 'id')

        return (<RowItem
          key={`${personId}_${index}`}
          title={`${get(person, 'firstName')} ${get(person, 'lastName')}`}
          details={[{
            term: 'Job title',
            description: get(person, 'title')
          }, {
            term: 'Company',
            description: get(person, 'company')
          }]}
          rowClass='rowSmall'
        />)
      })}
    </ul>)
  }

  renderTooltip () {
    const tooltip = this.state.tooltips[0]
    return (<Tooltip {...tooltip} />)
  }

  render () {
    return (
      <div className={this.style.pageBody}>
        <Helmet>
          <title>{`nudj - ${get(this.props, 'job.title')} @ ${get(this.props, 'company.name')}`}</title>
        </Helmet>
        <input type='hidden' name='_csrf' value={this.props.csrfToken} />
        <PageHeader
          title={get(this.props, 'job.title')}
          subtitle={<span>@ <Link className={this.style.companyLink} to={'/'}>{get(this.props, 'company.name')}</Link></span>}
        />
        <h3 className={this.style.pageHeadline}>We recommend nudj'ing...</h3>
        <div className={this.style.pageContent}>
          <div className={this.style.pageMain}>
            {this.renderNetworkList()}
          </div>
          <div className={this.style.pageSidebar}>
            {this.renderTooltip()}
          </div>
        </div>
        <hr className={this.style.sectionDivider} />
        <h3 className={this.style.pageHeadline}>We’ll also nudj these people in our network...</h3>
        <div className={this.style.pageContent}>
          <div className={this.style.pageMainNetwork}>
            {this.renderNudjNetworkList()}
          </div>
        </div>
      </div>
    )
  }
}