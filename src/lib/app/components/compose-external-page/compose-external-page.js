const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')
const merge = require('lodash/merge')
const { Link } = require('react-router-dom')
const Textarea = require('react-textarea-autosize').default

const Form = require('../form/form')
const FormStep = require('../form-step/form-step')
const FormStepLength = require('../form-step-length/form-step-length')
const FormStepStyle = require('../form-step-style/form-step-style')
const FormStepCompose = require('../form-step-compose/form-step-compose')
const FormStepSend = require('../form-step-send/form-step-send')
const FormStepNext = require('../form-step-next/form-step-next')
const PageHeader = require('../page-header/page-header')
const Tooltip = require('../tooltip/tooltip')

const getStyle = require('./compose-external-page.css')

const PrismicReact = require('../../lib/prismic-react')
const templater = require('../../../lib/templater')

const { postData } = require('../../actions/app')

module.exports = class ComposePage extends React.Component {
  constructor (props) {
    super(props)
    this.style = getStyle()

    const data = get(this.props, 'sentMessage', {})
    const active = this.activeFromData(data)
    const messages = get(this.props, 'messages', [])
    const tooltips = get(this.props, 'tooltips', [])

    this.state = {active, data, messages, tooltips}

    this.onSubmitStep = this.onSubmitStep.bind(this)
    this.onSubmitComposeMessage = this.onSubmitComposeMessage.bind(this)
    this.onSubmitSendMessage = this.onSubmitSendMessage.bind(this)
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
      }
    ]
    this.steps2 = [
      {
        name: 'sendMessage',
        component: FormStepSend,
        onSubmit: this.onSubmitSendMessage
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

  componentDidUpdate () {
    const tempMessage = this.getComposeMessageBaseText()
    if (!this.state.tempMessage && tempMessage) {
      this.setState({tempMessage})
    }
  }

  changedMessage (event) {
    const tempMessage = event.target.value
    this.setState({tempMessage})
  }

  getComposeMessageBase () {
    if (!this.state.data.selectLength || !this.state.data.selectStyle) {
      return ''
    }

    if (!this.state.messages.length) {
      return ''
    }

    const lengthTag = this.state.data.selectLength.type
    const styleTag = this.state.data.selectStyle.type
    const prismicMessage = this.state.messages.find(message => message.tags.includes(lengthTag) && message.tags.includes(styleTag))
    const prismicCompose = new PrismicReact(prismicMessage)

    const message = prismicCompose.fragmentToText({fragment: 'composemessage.composetext'})
    const subject = prismicCompose.fragmentToText({fragment: 'composemessage.composesubject'})

    return {message, subject}
  }

  getComposeMessageBaseSubject () {
    const subject = this.getComposeMessageBase().subject
    return subject ? this.renderMessage(subject, true) : ''
  }

  getComposeMessageBaseText () {
    return this.getComposeMessageBase().message
  }

  renderActiveOption (option, index) {
    const iconContent = option.iconEmoji || (<img src={`/assets/images/${option.icon}`} className={this.style.activeOptionImage} alt={option.title} />)

    return (<li className={this.style.activeOption} key={index}>
      <a className={this.style.activeOptionAction} onClick={option.onClick.bind(this)} href={option.link}>
        <span className={option.iconEmoji ? this.style.activeOptionIconEmoji : this.style.activeOptionIcon}>{iconContent}</span>
        <h5 className={this.style.activeOptionTitle}>{option.title}</h5>
        <p className={this.style.activeOptionText}>{option.text}</p>
      </a>
    </li>)
  }

  renderActiveOptions (options) {
    return (<ul className={this.style.activeOptionsContainer}>
      {options.map((option, index) => this.renderActiveOption(option, index))}
    </ul>)
  }

  renderCompletedSectionSummary (option) {
    const title = option.title ? (<h5 className={this.style.completedSectionSummaryTitle}>{option.title}</h5>) : ''
    const message = option.message

    // Need to support the compose message having multi-line message
    return (<div className={this.style.completedSectionSummary}>
      {title}
      <p className={this.style.completedSectionSummaryText}>{message}</p>
    </div>)
  }

  renderMessage (content, textOnly) {
    const companySlug = get(this.props, 'company.slug', '')
    const jobSlug = get(this.props, 'job.slug', '')

    const options = {
      template: content,
      data: {
        company: {
          name: get(this.props, 'company.name', '')
        },
        job: {
          bonus: get(this.props, 'job.bonus', ''),
          link: `https://nudj.co/jobs/${companySlug}+${jobSlug}`, // ?
          title: get(this.props, 'job.title', '')
        },
        recipient: {
          firstname: get(this.props, 'recipient.firstName', ''),
          lastname: get(this.props, 'recipient.lastName', '')
        },
        sender: {
          firstname: get(this.props, 'person.firstName', ''),
          lastname: get(this.props, 'person.lastName', '')
        }
      }
    }

    if (textOnly) {
      options.pify = content => content.join('')
      options.brify = () => '\n'
    } else {
      options.pify = this.pify.bind(this)
      options.tagify = this.tagify.bind(this)
    }

    return templater.render(options).join('\n\n')
  }

  pify (para, index, margin = 0) {
    return `<p class='${this.style.completedSectionSummaryMessageParagraph}' key='para${index}' style="margin-top:${1.5 * margin}rem;">${para.join('')}</p>`
  }

  tagify (contents, ok) {
    return `<span class='${ok ? this.style.tagOk : this.style.tagError}'>${contents}</span>`
  }

  renderComposeMessage () {
    const tempMessage = this.state.tempMessage || this.getComposeMessageBaseText()

    return (<div className={this.style.activeContainerCentered}>
      <div className={this.style.messageContainer}>
        <Textarea className={this.style.messageTextarea} name='template' value={tempMessage} onChange={this.changedMessage.bind(this)} id='message' />
      </div>
      <a className={this.style.composeMessageSave} onClick={this.onSubmitComposeMessage}>Next</a>
    </div>)
  }

  renderComposedMessage (messageContent) {
    const message = this.renderMessage(messageContent)
    return (<div className={this.style.completedSectionSummary}>
      <div className={this.style.completedSectionSummaryMessage} dangerouslySetInnerHTML={{ __html: message }} />
    </div>)
  }

  renderTooltip (tooltipTag, anchorBottom) {
    const tooltip = this.state.tooltips.find(tooltip => tooltip.tags.includes(tooltipTag))
    if (!tooltip || this.state.active !== tooltipTag) {
      return ('')
    }
    return (<div className={anchorBottom ? this.style.tooltipFloatingBottom : this.style.tooltipFloating}>
      <Tooltip {...tooltip} />
    </div>)
  }

  onSubmitStep (step) {
    return (stepData) => {
      const data = merge(this.state.data, {[step]: stepData})
      const active = get(this.state, 'active') + 1
      this.saveAndPostData({active, data})
    }
  }

  onSubmitComposeMessage () {
    const composeMessage = this.state.tempMessage || this.getComposeMessageBaseText()
    const data = merge(this.state.data, {composeMessage})
    const active = get(this.state, 'active') + 1
    this.saveAndPostData({active, data})
  }

  onSubmitSendMessage (event, sendMessage) {
    event.preventDefault()
    const link = event.currentTarget.href

    if (link) {
      window.open(link)
    }

    const data = merge(this.state.data, {sendMessage})
    const active = get(this.state, 'active') + 1
    this.saveAndPostData({active, data})
  }

  saveAndPostData ({active, data}) {
    this.setState({active, data}, () => {
      this.props.dispatch(postData({
        url: `/${get(this.props, 'job.slug')}/external/${get(this.props, 'personId')}`,
        data: this.state.data
      }))
    })
  }

  onClickStep (step, index, steps) {
    return (event) => {
      let active = this.state.active
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
    return (
      <Form className={this.style.pageBody} method='POST'>
        <Helmet>
          <title>{`nudj - ${get(this.props, 'job.title')} @ ${get(this.props, 'company.name')}`}</title>
        </Helmet>
        <input type='hidden' name='_csrf' value={this.props.csrfToken} />
        <PageHeader
          title={get(this.props, 'job.title')}
          subtitle={<span>@ <Link className={this.style.companyLink} to={'/'}>{get(this.props, 'company.name')}</Link></span>}
        />
        <h3 className={this.style.pageHeadline}>Sending a message to {recipientName}</h3>
        {this.steps.map((step, index, steps) => {
          const {
            name,
            component: Component,
            resets
          } = step
          return (
            <div className={this.style.pageContent} key={name}>
              <div className={this.style.pageMain}>
                <Component
                  name={name}
                  isActive={this.state.active === index}
                  index={index + 1}
                  {...this.state.data}
                  onSubmitStep={this.onSubmitStep}
                  messages={this.state.messages}
                  pageData={this.props}
                  onClick={this.onClickStep(step, index, steps)}
                  confirm={this.state.confirm === index && this.renderConfirm()}
                />
              </div>
              <div className={this.style.pageSidebar}>
                {this.renderTooltip(name)}
              </div>
            </div>
          )
        })}
        <div className={this.style.pageContent}>
          <div className={this.style.pageMain}>
            <FormStep
              name='composeMessage'
              isActive={this.state.active === 2}
              index={3}
              title='Create message'
              {...this.state.data}
              placeholder='Compose your masterpiece here.'
              content={this.renderComposeMessage.bind(this)}
              completed={this.renderComposedMessage.bind(this)}
            />
          </div>
          <div className={this.style.pageSidebar}>
            {this.renderTooltip('createMessage')}
          </div>
        </div>
        {this.steps2.map((step, index, steps) => {
          index = index + 3
          const name = step.name
          const Component = step.component
          return (
            <div className={this.style.pageContent} key={step.name}>
              <div className={this.style.pageMain}>
                <Component
                  name={name}
                  isActive={this.state.active === index}
                  index={index + 1}
                  {...this.state.data}
                  onSubmitStep={step.onSubmit || this.onSubmitStep}
                  messages={this.state.messages}
                  pageData={this.props}
                  onClick={this.onClickStep(step, index, steps)}
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
