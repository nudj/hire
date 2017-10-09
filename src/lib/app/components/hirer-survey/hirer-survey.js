const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')

const PageHeader = require('../page-header/page-header')
const Tooltip = require('../tooltip/tooltip')

const getStyle = require('./hirer-survey.css')

module.exports = class HirerSurvey extends React.Component {
  constructor (props) {
    super(props)
    this.style = getStyle()
  }

  renderTooltip () {
    const tooltip = get(this.props, 'tooltip')
    return !tooltip ? <span /> : (<Tooltip {...tooltip} />)
  }

  render () {
    const title = 'Complete our survey and jog your memory'
    const subtitle = 'This survey will help you uncover all the people worth asking for recommendations, whether they be ex-colleagues or friends, by asking you questions you wouldn’t necessarily ask yourself.'

    const surveyUrl = get(this.props, 'survey.link', 'about:blank')
    const surveyFrame = (<iframe src={surveyUrl} className={this.style.surveyFrame} />)

    return (<div className={this.style.pageBody}>
      <Helmet>
        <title>nudj - Discover referrers in your network</title>
      </Helmet>
      <input type='hidden' name='_csrf' value={this.props.csrfToken} />
      <PageHeader
        title='Discover referrers in your network'
        subtitle='On-boarding'
      />
      <h3 className={this.style.pageHeadline}>{title}</h3>
      <p className={this.style.copy}>{subtitle}</p>
      <div className={this.style.pageContent}>
        <div className={this.style.pageMain}>
          {surveyFrame}
        </div>
        <div className={this.style.pageSidebar}>
          {this.renderTooltip()}
        </div>
      </div>
    </div>)
  }
}
