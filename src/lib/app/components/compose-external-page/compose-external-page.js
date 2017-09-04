const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')
const { Link } = require('react-router-dom')

const Form = require('../form/form')
const FormStepLength = require('../form-step-length/form-step-length')
const FormStepStyle = require('../form-step-style/form-step-style')
const FormStepCompose = require('../form-step-compose/form-step-compose')
const FormStepSend = require('../form-step-send/form-step-send')
const FormStepNext = require('../form-step-next/form-step-next')
const PageHeader = require('../page-header/page-header')
const Tooltip = require('../tooltip/tooltip')
const { merge } = require('@nudj/library')

const getStyle = require('./compose-external-page.css')

const { postData } = require('../../actions/app')

module.exports = class ComposePage extends React.Component {
  constructor (props) {
    super(props)
    this.style = getStyle()

    const id = get(this.props, 'id')
    const data = get(this.props, 'externalMessage', {})
    const active = this.activeFromData(data)
    const messages = get(this.props, 'messages', [])
    const tooltips = get(this.props, 'tooltips', [])

    this.state = {active, data, id, messages, tooltips}

    this.onSubmitStep = this.onSubmitStep.bind(this)
    this.onClickStep = this.onClickStep.bind(this)
    this.onClickConfirm = this.onClickConfirm.bind(this)
    this.onClickCancel = this.onClickCancel.bind(this)

    this.steps = [
      {
        name: 'selectLength',
        component: FormStepLength,
        resets: 'composeMessage'
      },
      {
        name: 'selectStyle',
        component: FormStepStyle,
        resets: 'composeMessage'
      },
      {
        name: 'composeMessage',
        component: FormStepCompose
      },
      {
        name: 'sendMessage',
        component: FormStepSend
      },
      {
        name: 'nextSteps',
        component: FormStepNext
      }
    ]
  }

  componentWillReceiveProps (props) {
    const id = get(props, 'id')
    this.setState({ id })
  }

  activeFromData (data) {
    let active = 0

    if (data.sendMessage) {
      active = 4
    } else if (data.composeMessage) {
      active = 3
    } else if (data.selectStyle) {
      active = 2
    } else if (data.selectLength) {
      active = 1
    }

    return active
  }

  renderTooltip (tooltipTag, anchorBottom) {
    const tooltip = this.state.tooltips.find(tooltip => tooltip.tags.includes(tooltipTag))
    const activeName = this.steps[this.state.active].name
    if (!tooltip || activeName !== tooltipTag) {
      return ('')
    }
    return (<div className={anchorBottom ? this.style.tooltipFloatingBottom : this.style.tooltipFloating}>
      <Tooltip {...tooltip} />
    </div>)
  }

  onChangeStep (step) {
    return (stepData) => {
      this.setState({
        data: merge(this.state.data, {[step]: stepData})
      })
    }
  }

  onSubmitStep (step) {
    return (stepData) => {
      const data = merge(this.state.data, {[step]: stepData})
      const active = get(this.state, 'active') + 1
      this.saveAndPostData({active, data})
    }
  }

  saveAndPostData ({active, data}) {
    this.setState({active, data}, () => {
      let url = `/jobs/${get(this.props, 'job.slug')}/external/${get(this.props, 'recipient.id')}`
      let method = 'post'
      const data = this.state.data

      if (this.state.id) {
        url = `${url}/${this.state.id}`
        method = 'patch'
      }

      this.props.dispatch(postData({ url, data, method }))
    })
  }

  onClickStep (step, index, steps) {
    return (event) => {
      let active = this.state.active
      if (active < 4) { // only allow skipping through steps before sending
        let confirm = null
        if (index < this.state.active) {
          if (step.resets && !!this.state.data[step.resets]) {
            confirm = index
          } else {
            active = index
          }
        } else if ((index > this.state.active && !!this.state.data[step.name]) || (steps[index - 1] && !!this.state.data[steps[index - 1].name])) {
          active = index
        }
        this.setState({
          active,
          confirm
        })
      }
    }
  }

  onClickConfirm (event) {
    event.stopPropagation()
    const data = this.state.data
    data.composeMessage = null
    this.setState({
      active: this.state.confirm,
      confirm: null,
      data
    })
  }

  onClickCancel (event) {
    event.stopPropagation()
    this.setState({
      confirm: null
    })
  }

  renderConfirm () {
    return (
      <div className={this.style.confirm}>
        <h5 className={this.style.confirmTitle}>Whoa there!</h5>
        <p className={this.style.confirmText}>Selecting a different option will cause you to lose any edits you’ve made to your message.</p>
        <div className={this.style.confirmActions}>
          <button className={this.style.cancelButton} onClick={this.onClickCancel}>Cancel</button>
          <button className={this.style.confirmButton} onClick={this.onClickConfirm}>Ok</button>
        </div>
      </div>
    )
  }

  render () {
    const recipientName = `${get(this.props, 'recipient.firstName', '')} ${get(this.props, 'recipient.lastName', '')}`
    const data = this.state.data
    return (
      <Form className={this.style.pageBody} method='POST'>
        <Helmet>
          <title>{`nudj - ${get(this.props, 'job.title')} @ ${get(this.props, 'company.name')}`}</title>
        </Helmet>
        <input type='hidden' name='_csrf' value={this.props.csrfToken} />
        <PageHeader
          title={<Link className={this.style.jobLink} to={`/jobs/${get(this.props, 'job.slug')}`}>{get(this.props, 'job.title')}</Link>}
          subtitle={<span>@ <Link className={this.style.companyLink} to={'/'}>{get(this.props, 'company.name')}</Link></span>}
        />
        <h3 className={this.style.pageHeadline}>Sending a message to {recipientName}</h3>
        {this.steps.map((step, index, steps) => {
          const {
            name,
            component: Component
          } = step
          const canSkipTo = !!(steps[index - 1] && !!data[steps[index - 1].name])
          return (
            <div className={this.style.pageContent} key={name}>
              <div className={this.style.pageMain}>
                <Component
                  name={name}
                  isActive={this.state.active === index}
                  index={index + 1}
                  {...this.state.data}
                  onSubmitStep={this.onSubmitStep(name)}
                  onChangeStep={this.onChangeStep(name)}
                  messages={this.state.messages}
                  pageData={this.props}
                  onClick={this.onClickStep(step, index, steps)}
                  confirm={this.state.confirm === index && this.renderConfirm()}
                  canSkipTo={canSkipTo}
                />
              </div>
              <div className={this.style.pageSidebar}>
                {this.renderTooltip(name)}
              </div>
            </div>
          )
        })}
      </Form>
    )
  }
}
