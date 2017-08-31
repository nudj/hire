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
const {
  showDialog,
  hideDialog,
  setActiveStep
} = require('../../actions/app')
const { merge } = require('@nudj/library')

const getStyle = require('./compose-external-page.css')

const { postData } = require('../../actions/app')

module.exports = class ComposePage extends React.Component {
  constructor (props) {
    super(props)
    this.style = getStyle()

    const data = get(this.props, 'externalMessage', {})
    const active = this.activeFromData(data)

    this.onSubmitStep = this.onSubmitStep.bind(this)
    this.onClickStep = this.onClickStep.bind(this)
    this.onClickConfirm = this.onClickConfirm.bind(this)
    this.onClickCancel = this.onClickCancel.bind(this)

    this.steps = [
      {
        name: 'selectLength',
        component: FormStepLength,
        resets: 'composeMessage',
        confirm: true
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
        confirm: true
      },
      {
        name: 'nextSteps',
        component: FormStepNext
      }
    ]
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
    const activeName = this.steps[this.props.externalMessagePage.active].name
    if (!tooltip || activeName !== tooltipTag) {
      return ('')
    }
    return (<div className={anchorBottom ? this.style.tooltipFloatingBottom : this.style.tooltipFloating}>
      <Tooltip {...tooltip} />
    </div>)
  }

  onChangeStep (step) {
    return (stepData) => {
      // this.setState({
      //   data: merge(this.props.externalMessage, {[step]: stepData})
      // })
      this.props.dispatch(setStepData(step.name, stepData))
    }
  }

  onClickCancelDialog () {
    this.props.dispatch(hideDialog())
  }

  onSubmitStep (step) {
    return (stepData) => {
      if (step.confirm && !this.props.overlay) {
        return this.props.dispatch(showDialog('externalMessageConfirm'))
      }
      // const data = merge(this.props.externalMessage, {[step.name]: stepData})
      const active = get(this.props, 'externalMessagePage.active') + 1
      const stepName = step.name
      this.saveAndPostData({active, stepData, stepName})
      this.props.dispatch(hideDialog())
    }
  }

  saveAndPostData ({active, stepData, stepName}) {
    // this.setState({active, stepData}, () => {
    //   let url = `/jobs/${get(this.props, 'job.slug')}/external/${get(this.props, 'recipient.id')}`
    //   let method = 'post'
    //   const data = this.props.externalMessage
    //
    //   if (this.props.id) {
    //     url = `${url}/${this.props.id}`
    //     method = 'patch'
    //   }
    //
    //   this.props.dispatch(postData({ url, data, method }))
    // })
    this.props.dispatch(setActiveStep(active))
    this.props.dispatch(setStepData(stepName, stepData))
  }

  onClickStep (step, index, steps) {
    return (event) => {
      let active = this.props.externalMessagePage.active
      if (active < 4) { // only allow skipping through steps before sending
        let confirm = null
        if (index < this.props.externalMessagePage.active) {
          if (step.resets && !!this.props.externalMessage[step.resets]) {
            confirm = index
          } else {
            active = index
          }
        } else if ((index > this.props.externalMessagePage.active && !!this.props.externalMessage[step.name]) || (steps[index - 1] && !!this.props.externalMessage[steps[index - 1].name])) {
          active = index
        }
        // this.setState({
        //   active,
        //   confirm
        // })
        this.props.dispatch(setActiveStep(active))
        this.props.dispatch(showConfirmForStep(confirm))
      }
    }
  }

  onClickConfirm (event) {
    event.stopPropagation()
    // const data = this.props.externalMessage
    // data.composeMessage = null
    // this.setState({
    //   active: this.props.externalMessagePage.confirm,
    //   confirm: null,
    //   data
    // })
    this.props.dispatch(setActiveStep(this.props.externalMessagePage.confirm))
    this.props.dispatch(setStepData('composeMessage', null))
    this.props.dispatch(showConfirmForStep(null))
  }

  onClickCancel (event) {
    event.stopPropagation()
    // this.setState({
    //   confirm: null
    // })
    this.props.dispatch(showConfirmForStep(null))
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
                  isActive={this.props.externalMessagePage.active === index}
                  index={index + 1}
                  {...this.props.externalMessage}
                  {...this.props.externalMessagePage}
                  onSubmitStep={this.onSubmitStep(step)}
                  onChangeStep={this.onChangeStep(step)}
                  messages={get(this.props, 'messages', [])}
                  pageData={this.props}
                  onClick={this.onClickStep(step, index, steps)}
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
