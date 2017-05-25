const React = require('react')
const get = require('lodash/get')
const merge = require('lodash/merge')
const { Link } = require('react-router-dom')

const Form = require('../form/form')
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

    const data = this.props.sentMessage || {}
    const active = this.activeFromData(data)
    const messages = this.props.messages
    const tooltips = this.props.tooltips

    this.state = {active, data, messages, tooltips}
  }

  activeFromData (data) {
    let active = 'selectLength'

    if (data.sendMessage) {
      active = 'nextSteps'
    } else if (data.composeMessage) {
      active = 'sendMessage'
    } else if (data.selectStyle) {
      active = 'composeMessage'
    } else if (data.selectLength) {
      active = 'selectStyle'
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

  getComposeMessageBaseText () {
    if (!this.state.data.selectLength || !this.state.data.selectStyle) {
      return ''
    }

    const lengthTag = this.state.data.selectLength.type
    const styleTag = this.state.data.selectStyle.type
    const message = this.state.messages.find(message => message.tags.includes(lengthTag) && message.tags.includes(styleTag))
    const prismicCompose = new PrismicReact(message)

    return prismicCompose.fragmentToText({fragment: 'composemessage.composetext'})
  }

  renderActiveOption (option, index) {
    const iconContent = option.iconEmoji || (<img src={`/assets/images/${option.icon}`} className={this.style.activeOptionImage} alt={option.title} />)

    return (<li className={this.style.activeOption} key={index}>
      <a className={this.style.activeOptionAction} onClick={option.onClick.bind(this)}>
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

  renderPreActiveText (text) {
    return (<p className={this.style.preActiveText}>{text}</p>)
  }

  renderNextSteps () {
    let content = this.renderPreActiveText('Let us know what you’d like to do next.')

    if (this.state.active === 'nextSteps') {
      content = (<div className={this.style.activeContainerCentered}>
        <p className={this.style.activeContainerTitle}>Congrats on sending your first message!<br /> What would you like to do next?</p>
        <Link to={'/jobs'} className={this.style.nextStepDashboard}>Go to dashboard</Link>
        <Link to={`/jobs/${get(this.props, 'job.slug')}/external`} className={this.style.nextStepNudj}>Send another nudj</Link>
      </div>)
    }

    return (<div className={this.style.section}>
      <h4 className={this.style.sectionTitle}>
        <span className={this.style.sectionNumber}>5</span> Next steps
      </h4>
      {content}
    </div>)
  }

  renderSectionLength () {
    const options = [
      {
        icon: 'message-bubble.svg',
        title: 'Short and sweet',
        text: 'For getting straight to the point.',
        onClick: () => this.submitSelectLength({
          type: 'short',
          title: 'Short and sweet',
          message: 'For getting straight to the point.'
        })
      },
      {
        icon: 'detail-icon.svg',
        title: 'A bit more detail',
        text: 'For when you need to add extra info.',
        onClick: () => this.submitSelectLength({
          type: 'long',
          title: 'A bit more detail',
          message: 'For when you need to add extra info.'
        })
      }
    ]

    let content = ('')

    if (this.state.active === 'selectLength') {
      content = this.renderActiveOptions(options)
    } else if (this.state.data.selectLength) {
      content = this.renderCompletedSectionSummary(this.state.data.selectLength) // not really
    }

    return (<div className={this.style.section}>
      <h4 className={this.style.sectionTitle}>
        <span className={this.state.data.selectLength ? this.style.sectionDone : this.style.sectionNumber}>1</span> Select length
      </h4>
      {content}
    </div>)
  }

  renderMessage (content) {
    return templater.render({
      template: content,
      data: {
        refereeName: 'First Name',
        job: {
          title: get(this.props, 'job.title'), // ?
          bonus: get(this.props, 'job.bonus')  // ?
        },
        companyName: get(this.props, 'company.name'), // ?
        link: 'https://nudj.co/company/job', // ?
        personName: `${get(this.props, 'person.firstName')} ${get(this.props, 'person.lastName')}` // ?
      },
      tagify: this.tagify.bind(this) // ?
    })
  }

  // ?
  tagify (contents, ok) {
    return `<span class='${ok ? this.style.tagOk : this.style.tagError}'>${contents}</span>`
  }

  renderComposeMessage () {
    const tempMessage = this.state.tempMessage || this.getComposeMessageBaseText()

    return (<div className={this.style.activeContainer}>
      <div className={this.style.messageContainer}>
        <textarea className={this.style.messageTextarea} name='template' value={tempMessage} onChange={this.changedMessage.bind(this)} id='message' />
      </div>
      <a className={this.style.composeMessageSave} onClick={this.submitComposeMessage.bind(this)}>Save</a>
    </div>)
  }

  renderComposedMessage (messageContent) {
    const message = this.renderMessage(messageContent)
    return (<div className={this.style.completedSectionSummary}>
      <div className={this.style.completedSectionSummaryMessage} dangerouslySetInnerHTML={{ __html: message }} />
    </div>)
  }

  renderSectionComposeMessage () {
    let content = this.renderPreActiveText('Compose your masterpiece here.')

    if (this.state.active === 'composeMessage') {
      content = this.renderComposeMessage()
    } else if (this.state.data.composeMessage) {
      const composeMessageContent = this.state.data.composeMessage
      content = this.renderComposedMessage(composeMessageContent)
    }

    return (<div className={this.style.section}>
      <h4 className={this.style.sectionTitle}>
        <span className={this.state.data.composeMessage ? this.style.sectionDone : this.style.sectionNumber}>3</span> Create message
      </h4>
      {content}
    </div>)
  }

  renderSectionSendMessage () {
    const options = [
      {
        icon: 'email-icon.svg',
        title: 'Send it via your email app',
        text: 'This will open whatever you’ve set as the default mail client on your computer or device (for example, Mail on Mac).',
        onClick: () => this.submitSendMessage({
          type: 'email',
          title: 'Send it via your email app',
          message: 'This will open whatever you’ve set as the default mail client on your computer or device (for example, Mail on Mac).'
        })
      },
      {
        icon: 'mobile.svg',
        title: 'Send it using a message app',
        text: 'This will open another window, for you to copy the message, so you can paste into the app of your choice.',
        onClick: () => this.submitSendMessage({
          type: 'message',
          title: 'Send it using a message app',
          message: 'This will open another window, for you to copy the message, so you can paste into the app of your choice.'
        })
      }
    ]

    let content = this.renderPreActiveText('Tell us how you want to send it, so we can deliver it to you in the format you need.')

    if (this.state.active === 'sendMessage') {
      content = this.renderActiveOptions(options)
    } else if (this.state.data.sendMessage) {
      content = this.renderCompletedSectionSummary(this.state.data.sendMessage) // not really
    }

    return (<div className={this.style.section}>
      <h4 className={this.style.sectionTitle}>
        <span className={this.state.data.sendMessage ? this.style.sectionDone : this.style.sectionNumber}>4</span> Send message
      </h4>
      {content}
    </div>)
  }

  renderSectionStyle () {
    const options = [
      {
        iconEmoji: '👭',
        title: 'BFFs',
        text: 'You’re inseperable!',
        onClick: () => this.submitSelectStyle({
          type: 'bff',
          title: 'BFFs',
          message: 'You know this person like the back of your hand.'
        })
      },
      {
        iconEmoji: '🤜🤛',
        title: 'Familar',
        text: 'Keep it casual.',
        onClick: () => this.submitSelectStyle({
          type: 'familiar',
          title: 'Familar',
          message: 'Keep it casual.'
        })
      },
      {
        iconEmoji: '🤝',
        title: 'Professional',
        text: 'Stay classy.',
        onClick: () => this.submitSelectStyle({
          type: 'professional',
          title: 'Professional',
          message: 'Stay classy.'
        })
      }
    ]

    let content = this.renderPreActiveText('Choose how best to say it.')

    if (this.state.active === 'selectStyle') {
      content = this.renderActiveOptions(options)
    } else if (this.state.data.selectStyle) {
      content = this.renderCompletedSectionSummary(this.state.data.selectStyle) // not really
    }

    return (<div className={this.style.section}>
      <h4 className={this.style.sectionTitle}>
        <span className={this.state.data.selectStyle ? this.style.sectionDone : this.style.sectionNumber}>2</span> Select style
      </h4>
      {content}
    </div>)
  }

  renderTooltip (tooltipTag) {
    const tooltip = this.state.tooltips.find(tooltip => tooltip.tags.includes(tooltipTag))
    if (!tooltip || this.state.active !== tooltipTag) {
      return ('')
    }
    const props = {tooltip}
    return (<div className={this.style.tooltipFloating}>
      <Tooltip {...props} />
    </div>)
  }

  submitComposeMessage () {
    const composeMessage = this.state.tempMessage || this.getComposeMessageBaseText()
    const data = merge({}, this.state.data, {composeMessage})
    const active = 'sendMessage'
    this.saveAndPostData({active, data})
  }

  submitSelectLength (selectLength) {
    const data = merge({}, this.state.data, {selectLength})
    const active = 'selectStyle'
    this.saveAndPostData({active, data})
  }

  submitSelectStyle (selectStyle) {
    const data = merge({}, this.state.data, {selectStyle})
    const active = 'composeMessage'
    this.saveAndPostData({active, data})
  }

  submitSendMessage (sendMessage) {
    const data = merge({}, this.state.data, {sendMessage})
    const active = 'nextSteps'
    this.saveAndPostData({active, data})
  }

  saveAndPostData ({active, data}) {
    this.setState({active, data}, () => {
      this.props.dispatch(postData({
        url: `/jobs/${get(this.props, 'job.slug')}/external/${get(this.props, 'personId')}`,
        data: this.state.data
      }))
    })
  }

  render () {
    return (
      <Form className={this.style.pageBody} method='POST'>
        <input type='hidden' name='_csrf' value={this.props.csrfToken} />
        <PageHeader
          title={get(this.props, 'job.title')}
          subtitle={<span>@ <Link to={'/jobs'}>{get(this.props, 'company.name')}</Link></span>}
        />
        <h3 className={this.style.pageHeadline}>We recommend sending a Nujd request to...</h3>
        <div className={this.style.pageContent}>
          <div className={this.style.pageMain}>
            {this.renderSectionLength()}
          </div>
          <div className={this.style.pageSidebar}>
            {this.renderTooltip('selectLength')}
          </div>
        </div>
        <div className={this.style.pageContent}>
          <div className={this.style.pageMain}>
            {this.renderSectionStyle()}
          </div>
          <div className={this.style.pageSidebar}>
            {this.renderTooltip('selectStyle')}
          </div>
        </div>
        <div className={this.style.pageContent}>
          <div className={this.style.pageMain}>
            {this.renderSectionComposeMessage()}
          </div>
          <div className={this.style.pageSidebar}>
            {this.renderTooltip('createMessage')}
          </div>
        </div>
        <div className={this.style.pageContent}>
          <div className={this.style.pageMain}>
            {this.renderSectionSendMessage()}
          </div>
          <div className={this.style.pageSidebar}>
            {this.renderTooltip('sendMessage')}
          </div>
        </div>
        <div className={this.style.pageContent}>
          <div className={this.style.pageMain}>
            {this.renderNextSteps()}
          </div>
          <div className={this.style.pageSidebar}>{('')}</div>
        </div>
      </Form>
    )
  }
}
