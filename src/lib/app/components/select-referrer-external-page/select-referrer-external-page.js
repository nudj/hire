const React = require('react')
const get = require('lodash/get')
const { Link } = require('react-router-dom')

const PageHeader = require('../page-header/page-header')
const RowItem = require('../row-item/row-item')
const Tooltip = require('../tooltip/tooltip')

const getStyle = require('./select-referrer-external-page.css')

module.exports = class ComposePage extends React.Component {
  constructor (props) {
    super(props)
    this.style = getStyle()

    const tooltips = get(this.props, 'tooltips', [])

    this.state = {tooltips}
  }

  renderNetworkListRowItem ({buttonClass = this.style.nudjButton, buttonLabel, jobSlug, person, index}) {
    const personId = get(person, 'id', '')
    const firstName = get(person, 'firstName', '')
    const lastName = get(person, 'lastName', '')
    const title = get(person, 'title', '')
    const company = get(person, 'company', '')

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
        <Link className={buttonClass} to={`/${jobSlug}/external/${get(person, 'id')}`}>{buttonLabel}</Link>
      ]}
    />)
  }

  renderNetworkList () {
    const jobSlug = get(this.props, 'job.slug', '')
    const network = get(this.props, 'network', [])
    const networkSaved = get(this.props, 'networkSaved', [])
    const networkSent = get(this.props, 'networkSent', [])
    return (<ul className={this.style.network}>
      {network.map((person, index) => {
        const personId = get(person, 'id')
        let buttonLabel = 'Nudj'
        let buttonClass = this.style.nudjButton

        if (networkSent.includes(personId)) {
          return ''
        } else if (networkSaved.includes(personId)) {
          buttonLabel = 'Continue'
          buttonClass = this.style.continueButton
        }

        return this.renderNetworkListRowItem({buttonClass, buttonLabel, jobSlug, person, index})
      })}
    </ul>)
  }

  renderNudjNetworkListEmpty () {
    return (<div>
      <h3 className={this.style.pageHeadline}>Don’t want to send to these folks? Check back soon, we’ll have more for you.</h3>
    </div>)
  }

  renderNudjNetworkList () {
    const networkSent = get(this.props, 'networkSent', [])
    const nudjNetwork = get(this.props, 'nudjNetwork', [])

    if (networkSent.length) {
      return this.renderNudjNetworkListEmpty()
    }

    return (<div>
      <h3 className={this.style.pageHeadline}>We’ll also be sending a request to these people in our network...</h3>
      <div className={this.style.pageContent}>
        <div className={this.style.pageMainNetwork}>
          <ul className={this.style.networkSmall}>
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
          </ul>
        </div>
      </div>
    </div>)
  }

  renderTooltip () {
    const tooltip = this.state.tooltips[0]
    return (<Tooltip {...tooltip} />)
  }

  render () {
    return (
      <form className={this.style.pageBody} action={`/${get(this.props, 'company.slug')}/${get(this.props, 'job.slug')}/send`} method='POST'>
        <input type='hidden' name='_csrf' value={this.props.csrfToken} />
        <PageHeader
          title={get(this.props, 'job.title')}
          subtitle={<span>@ <Link className={this.style.companyLink} to={'/'}>{get(this.props, 'company.name')}</Link></span>}
        />
        <h3 className={this.style.pageHeadline}>We recommend sending a Nujd request to...</h3>
        <div className={this.style.pageContent}>
          <div className={this.style.pageMain}>
            {this.renderNetworkList()}
          </div>
          <div className={this.style.pageSidebar}>
            {this.renderTooltip()}
          </div>
        </div>
        {this.renderNudjNetworkList()}
      </form>
    )
  }
}
