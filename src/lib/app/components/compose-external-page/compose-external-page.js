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
const DialogConfirm = require('../dialog-confirm-send-internal/dialog-confirm-send-internal')
const actions = require('../../actions/app')
const { merge } = require('@nudj/library')

const getStyle = require('./compose-external-page.css')
const { postData } = require('../../actions/app')

const {
  showDialog,
  hideDialog,
  setActiveStep,
  setStepData,
  saveStepData,
  hideConfirm,
  saveSendData
} = actions
const steps = [
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
    component: FormStepSend,
    confirm: 'GMAIL',
    action: 'saveSendData'
  },
  {
    name: 'nextSteps',
    component: FormStepNext
  }
]

module.exports = class ComposePage extends React.Component {
  constructor (props) {
    super(props)
    this.style = getStyle()

    this.onSubmitStep = this.onSubmitStep.bind(this)
    this.onClickStep = this.onClickStep.bind(this)
    this.onClickConfirm = this.onClickConfirm.bind(this)
    this.onClickCancel = this.onClickCancel.bind(this)
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
    const tooltip = get(this.props, 'tooltips', []).find(tooltip => tooltip.tags.includes(tooltipTag))
    const activeName = steps[this.props.externalMessagePage.active].name
    if (!tooltip || activeName !== tooltipTag) {
      return ('')
    }
    return (<div className={anchorBottom ? this.style.tooltipFloatingBottom : this.style.tooltipFloating}>
      <Tooltip {...tooltip} />
    </div>)
  }

  onChangeStep (step) {
    return (stepData) => this.props.dispatch(setStepData(step.name, stepData))
  }

  onSubmitStep (step) {
    const stepName = step.name
    return (stepData, options = {}) => {
      if (step.confirm && step.confirm === stepData && !this.props.overlay) {
        return this.props.dispatch(showDialog({
          confirm: {
            action: step.action || 'saveStepData',
            arguments: [stepName, stepData, options]
          },
          cancel: {
            action: 'hideDialog'
          }
        }))
      }
      this.props.dispatch(actions[step.action || 'saveStepData'](stepName, stepData, options))
    }
  }

  saveAndPostData ({active, stepData, stepName}) {
    this.setState({active, stepData}, () => {
      let url = `/jobs/${get(this.props, 'job.slug')}/external/${get(this.props, 'recipient.id')}`
      let method = 'post'
      const data = this.props.externalMessage

      if (this.props.id) {
        url = `${url}/${this.props.id}`
        method = 'patch'
      }

      this.props.dispatch(postData({ url, data, method }))
    })
  }

  onClickStep (index) {
    return event => this.props.dispatch(setActiveStep(index))
  }

  onClickConfirm (event) {
    event.stopPropagation()
    this.props.dispatch(setActiveStep(this.props.externalMessagePage.confirm, true))
  }

  onClickCancel (event) {
    event.stopPropagation()
    this.props.dispatch(hideConfirm())
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
    const data = this.props.externalMessage
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
        {steps.map((step, index, steps) => {
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
                  isActive={this.props.externalMessagePage.active === index}
                  index={index + 1}
                  {...this.props.externalMessage}
                  {...this.props.externalMessagePage}
                  onSubmitStep={this.onSubmitStep(step)}
                  onChangeStep={this.onChangeStep(step)}
                  messages={get(this.props, 'messages', [])}
                  pageData={this.props}
                  onClick={this.onClickStep(index)}
                  confirm={this.props.externalMessagePage.confirm === index && this.renderConfirm()}
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
