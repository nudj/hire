const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')
const pick = require('lodash/pick')
const isNil = require('lodash/isNil')
const { merge } = require('@nudj/library')
const actions = require('@nudj/framework/actions')

const pageActions = require('./actions')
const { getActiveStep } = require('../../lib')
const LayoutApp = require('../../components/layout-app')
const Link = require('../../components/link/link')
const Form = require('../../components/form/form')
const FormStepLength = require('../../components/form-step-length/form-step-length')
const FormStepStyle = require('../../components/form-step-style/form-step-style')
const FormStepCompose = require('../../components/form-step-compose/form-step-compose')
const FormStepSend = require('../../components/form-step-send/form-step-send')
const FormStepNext = require('../../components/form-step-next/form-step-next')
const PageHeader = require('../../components/page-header/page-header')
const Tooltip = require('../../components/tooltip/tooltip')
const getStyle = require('./style.css')

const {
  showDialog,
  hideConfirm
} = actions.app
const {
  setActiveStep,
  setStepData,
  saveSendData
} = pageActions
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

class ComposeExternalPage extends React.Component {
  constructor (props) {
    super(props)
    this.style = getStyle()

    this.onSubmitStep = this.onSubmitStep.bind(this)
    this.onClickStep = this.onClickStep.bind(this)
    this.onClickConfirm = this.onClickConfirm.bind(this)
    this.onClickCancel = this.onClickCancel.bind(this)
  }

  renderTooltip (tooltipTag, anchorBottom) {
    const tooltip = get(this.props, 'tooltips', []).find(tooltip => tooltip.tags.includes(tooltipTag))
    let active = get(this.props, 'externalComposePage.active')
    if (isNil(active)) {
      active = getActiveStep(get(this.props, 'externalMessage', {}))
    }
    const activeName = steps[active].name
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
        if (this.props.googleAuthenticated) {
          return this.props.dispatch(saveSendData(stepName, stepData))
        }
        return this.props.dispatch(showDialog({
          options: [
            {
              type: 'cancel',
              action: {
                name: 'hideDialog'
              }
            },
            {
              type: 'confirm',
              action: {
                name: step.action || 'saveStepData',
                arguments: [stepName, stepData, options]
              }
            }
          ]
        }))
      }
      this.props.dispatch(pageActions[step.action || 'saveStepData'](stepName, stepData, options))
    }
  }

  onClickStep (requestedStep) {
    const currentMessage = merge(get(this.props, 'externalMessage', {}), pick(this.props.externalComposePage, steps.map(step => step.name)))
    return event => {
      this.props.dispatch(setActiveStep(requestedStep, currentMessage))
    }
  }

  onClickConfirm (event) {
    event.stopPropagation()
    const currentMessage = merge(this.props.externalMessage, pick(this.props.externalComposePage, steps.map(step => step.name)))
    this.props.dispatch(setActiveStep(this.props.externalComposePage.confirm, currentMessage, true))
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
    const data = get(this.props, 'externalMessage', {})
    let active = get(this.props, 'externalComposePage.active')
    if (isNil(active)) {
      active = getActiveStep(get(this.props, 'externalMessage', {}))
    }
    return (
      <LayoutApp {...this.props} className={this.style.pageBody}>
        <Form method='POST'>
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
                    isActive={active === index}
                    index={index + 1}
                    {...this.props.externalMessage}
                    {...this.props.externalComposePage}
                    onSubmitStep={this.onSubmitStep(step)}
                    onChangeStep={this.onChangeStep(step)}
                    messages={get(this.props, 'messages', [])}
                    pageData={this.props}
                    onClick={this.onClickStep(index)}
                    confirm={this.props.externalComposePage.confirm === index && this.renderConfirm()}
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
      </LayoutApp>
    )
  }
}

module.exports = ComposeExternalPage