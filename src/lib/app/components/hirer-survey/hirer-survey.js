const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')
const { Redirect } = require('react-router')

const PageHeader = require('../page-header/page-header')
const Tooltip = require('../tooltip/tooltip')

const getStyle = require('./hirer-survey.css')

const { updatePage } = require('../../actions/app')
const { LONG_POLL_INTERVAL } = require('../../../lib/constants')

module.exports = class HirerSurvey extends React.Component {
  constructor (props) {
    super(props)
    this.style = getStyle()

    const completed = false
    const polling = null
    this.state = {completed, polling}
  }

  componentWillReceiveProps (props) {
    const currentTypeformToken = get(this.props, 'employeeSurvey.typeformToken', '')
    const typeformToken = get(props, 'employeeSurvey.typeformToken', '')
    if (currentTypeformToken !== typeformToken) {
      const completed = true
      this.setState({completed})
    }
  }

  shouldComponentUpdate (props, state) {
    const currentCompleted = this.state.completed
    const completed = state.completed
    return completed !== currentCompleted
  }

  componentDidMount () {
    this.poll()
  }

  componentWillUnmount () {
    this.cancelPoll()
  }

  cancelPoll (callback = () => {}) {
    const existingPolling = this.state.polling
    if (!existingPolling) {
      return
    }
    clearTimeout(existingPolling)
    const polling = null
    this.setState({polling}, () => callback())
  }

  poll () {
    if (this.state.polling) {
      return
    }

    const polling = setTimeout(() => {
      const page = this.props
      this.props.dispatch(updatePage({page}))
      this.cancelPoll(() => this.poll())
    }, LONG_POLL_INTERVAL)
    this.setState({polling})
  }

  renderTooltip () {
    const tooltip = get(this.props, 'tooltip')
    return !tooltip ? <span /> : (<Tooltip {...tooltip} />)
  }

  render () {
    if (this.state.completed) {
      return (<Redirect to='/' push />)
    }

    const title = 'Time to enter your mind palace'
    const subtitle = 'This survey will help you uncover all the people worth asking for recommendations, whether they be ex-colleagues or friends, by asking questions you wouldn’t necessarily ask yourself.'

    const surveyUrl = get(this.props, 'survey.link', 'about:blank')
    const surveyFrame = (<iframe src={surveyUrl} className={this.style.surveyFrame} />)

    return (<div className={this.style.pageBody}>
      <Helmet>
        <title>nudj - Complete your survey</title>
      </Helmet>
      <input type='hidden' name='_csrf' value={this.props.csrfToken} />
      <PageHeader
        title='Complete your survey'
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
