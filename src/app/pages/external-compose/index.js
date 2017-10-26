const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')
const pick = require('lodash/pick')
const find = require('lodash/find')
const isNil = require('lodash/isNil')
const { merge } = require('@nudj/library')
const actions = require('@nudj/framework/actions')

const pageActions = require('./actions')
const { getActiveStep } = require('../../lib')
const LayoutApp = require('../../components/layout-app')
const Link = require('../../components/link/link')
const Form = require('../../components/form/form')
const Loading = require('../../components/loading/loading')
const FormStepLength = require('../../components/form-step-length/form-step-length')
const FormStepStyle = require('../../components/form-step-style/form-step-style')
const FormStepCompose = require('../../components/form-step-compose/form-step-compose')
const FormStepSend = require('../../components/form-step-send/form-step-send')
const FormStepNext = require('../../components/form-step-next/form-step-next')
const PageHeader = require('../../components/page-header/page-header')
const Tooltip = require('../../components/tooltip/tooltip')
const ConversationBox = require('../../components/conversation-box/conversation-box')
const getStyle = require('./style.css')

const {
  showDialog,
  postData
} = actions.app
const {
  setActiveStep,
  setStepData,
  hideConfirm,
  saveSendData,
  saveMessageDraft
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
    this.onSendThreadMessage = this.onSendThreadMessage.bind(this)
    this.onDraftChange = this.onDraftChange.bind(this)
    this.handlePageLeave = this.handlePageLeave.bind(this)
  }

  renderTooltip (tooltipTag, anchorBottom) {
    const tooltip = get(this.props, 'tooltips', []).find(tooltip => tooltip.tags.includes(tooltipTag))
    let active = get(this.props, 'externalComposePage.active')
    if (isNil(active)) {
      active = getActiveStep(get(this.props, 'externalMessage', {}))
    }
    const activeName = get(steps[active], 'name')
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

  onSendThreadMessage (conversation) {
    return () => {
      const hasReply = isNil(find(conversation, (email) => email.sender.includes(this.props.recipient.email))) // Check if any part of the thread was sent by the recipient
      const url = `/jobs/${this.props.job.slug}/external/${this.props.externalMessage.id}`
      const subject = hasReply ? 'Re: Can you help me out?' : 'Can you help me out?' // Subject must match for emails to chain, including 'Re:'.

      this.props.dispatch(postData({
        url,
        method: 'post',
        data: {
          message: this.props.externalComposePage.draft,
          thread: this.props.externalMessage.threadId,
          recipient: this.props.recipient.email,
          subject
        }
      }))
    }
  }

  onDraftChange (event) {
    this.props.dispatch(saveMessageDraft(event.target.value))
  }

  handlePageLeave (event) {
    event.preventDefault()
    let url = event.target.getAttribute('href')

    if (!url) {
      url = '/'
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
          type: 'link',
          url
        }
      ],
      dialog: this.props.exitDialog
    }))
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
    const sentMessage = get(this.props, 'externalMessage.sendMessage') // If this entry exists, this message has been sent.
    const recipientName = `${get(this.props, 'recipient.firstName', '')} ${get(this.props, 'recipient.lastName', '')}`
    const data = get(this.props, 'externalMessage', {})
    let active = get(this.props, 'externalComposePage.active')
    if (isNil(active)) {
      active = getActiveStep(get(this.props, 'externalMessage', {}))
    }

    const composeMessage = steps.map((step, index, steps) => {
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
    })

    const conversationBody = (
      <div className={this.style.pageContent}>
        <div className={this.style.pageMain}>
          <ConversationBox onDraftChange={this.onDraftChange} onSendMessage={this.onSendThreadMessage} {...this.props} />
        </div>
      </div>
    )

    const loading = get(this.props, 'loading') && !sentMessage
    const pageBody = sentMessage && sentMessage !== 'EMAIL' ? conversationBody : composeMessage
    const unfinishedDraft = get(this.props, 'externalComposePage.draft')

    let page = (
      <LayoutApp {...this.props} onPageLeave={unfinishedDraft ? this.handlePageLeave : ''} className={this.style.pageBody}>
        <Form method='POST'>
          <Helmet>
            <title>{`nudj - ${get(this.props, 'job.title')} @ ${get(this.props, 'company.name')}`}</title>
          </Helmet>
          <input type='hidden' name='_csrf' value={this.props.csrfToken} />
          <PageHeader
            fixed={sentMessage}
            title={<Link className={this.style.jobLink} to={`/jobs/${get(this.props, 'job.slug')}`}>{get(this.props, 'job.title')}</Link>}
            subtitle={<span>@ <Link className={this.style.companyLink} to={'/'}>{get(this.props, 'company.name')}</Link></span>}>
            <Link className={this.style.headerLink} onClick={unfinishedDraft ? this.handlePageLeave : ''} to={`/jobs/${get(this.props, 'job.slug')}`}>View job dashboard</Link>
            <Link className={this.style.headerLink} onClick={unfinishedDraft ? this.handlePageLeave : ''} to={`/jobs/${get(this.props, 'job.slug')}/nudj`}>Nudj job</Link>
          </PageHeader>
          { sentMessage ? <h3 className={this.style.pageHeadline}>Sending a message to {recipientName}</h3> : '' }
          {pageBody}
        </Form>
      </LayoutApp>
    )

    if (loading) {
      page = (<Loading {...this.props} />)
    }

    return page
  }
}

ComposeExternalPage.handlesLoading = true

module.exports = ComposeExternalPage
