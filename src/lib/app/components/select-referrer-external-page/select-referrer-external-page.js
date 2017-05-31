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

  renderNetworkList () {
    const jobSlug = get(this.props, 'job.slug', '')
    const network = get(this.props, 'network', [])
    const networkSent = get(this.props, 'networkSent', [])
    return (<ul className={this.style.network}>
      {network.map((person, index) => {
        const personId = get(person, 'id')

        if (networkSent.includes(personId)) {
          return ''
        }

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
          actions={[
            <Link className={this.style.nudjButton} to={`/jobs/${jobSlug}/external/${get(person, 'id')}`}>Nudj</Link>
          ]}
        />)
      })}
    </ul>)
  }

  renderNudjNetworkList () {
    const networkSent = get(this.props, 'networkSent', [])
    const nudjNetwork = get(this.props, 'nudjNetwork', [])

    if (networkSent.length) {
      return ('')
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
          subtitle={<span>@ <Link className={this.style.companyLink} to={'/jobs'}>{get(this.props, 'company.name')}</Link></span>}
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
