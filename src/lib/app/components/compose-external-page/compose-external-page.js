const React = require('react')
const get = require('lodash/get')
const merge = require('lodash/merge')
const { Link } = require('react-router-dom')
const Textarea = require('react-textarea-autosize').default

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

    const data = get(this.props, 'sentMessage', {})
    const active = this.activeFromData(data)
    const messages = get(this.props, 'messages', [])
    const tooltips = get(this.props, 'tooltips', [])

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

  renderPreActiveText (text) {
    return (<p className={this.style.preActiveText}>{text}</p>)
  }

  renderNextSteps () {
    let content = this.renderPreActiveText('Let us know what you’d like to do next.')

    let sectionClass = this.style.section
    let sectionNumberClass = this.style.sectionNumber

    if (this.state.active === 'nextSteps') {
      content = (<div className={this.style.activeContainerCentered}>
        <p className={this.style.activeContainerTitle}>Congrats on sending your first message!<br /> What would you like to do next?</p>
        <Link to={'/'} className={this.style.nextStepDashboard}>Go to dashboard</Link>
        <Link to={`/${get(this.props, 'job.slug')}/external`} className={this.style.nextStepNudj}>Send another nudj</Link>
      </div>)
      sectionClass = this.style.sectionActive
      sectionNumberClass = this.style.sectionNumberActive
    }

    return (<div className={sectionClass}>
      <h4 className={this.style.sectionTitle}>
        <span className={sectionNumberClass}>5</span>Next steps
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
    let sectionClass = this.style.section
    let sectionNumberClass = this.style.sectionNumber

    if (this.state.active === 'selectLength') {
      content = this.renderActiveOptions(options)
      sectionClass = this.style.sectionActive
      sectionNumberClass = this.style.sectionNumberActive
    } else if (this.state.data.selectLength) {
      content = this.renderCompletedSectionSummary(this.state.data.selectLength) // not really
      sectionNumberClass = this.style.sectionDone
    }

    return (<div className={sectionClass}>
      <h4 className={this.style.sectionTitle}>
        <span className={sectionNumberClass}>1</span>Select length
      </h4>
      {content}
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
          bonus: get(this.props, 'job.title', ''),
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

    return (<div className={this.style.activeContainer}>
      <div className={this.style.messageContainer}>
        <Textarea className={this.style.messageTextarea} name='template' value={tempMessage} onChange={this.changedMessage.bind(this)} id='message' />
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
    let sectionClass = this.style.section
    let sectionNumberClass = this.style.sectionNumber

    if (this.state.active === 'composeMessage') {
      content = this.renderComposeMessage()
      sectionClass = this.style.sectionActive
      sectionNumberClass = this.style.sectionNumberActive
    } else if (this.state.data.composeMessage) {
      const composeMessageContent = this.state.data.composeMessage
      content = this.renderComposedMessage(composeMessageContent)
      sectionNumberClass = this.style.sectionDone
    }

    return (<div className={sectionClass}>
      <h4 className={this.style.sectionTitle}>
        <span className={sectionNumberClass}>3</span>Create message
      </h4>
      {content}
    </div>)
  }

  renderSectionSendMessage () {
    const recipient = get(this.props, 'recipient.email', 'tech@nudj.com')

    const defaultSubject = 'I need your help'
    const prismicSubject = this.getComposeMessageBaseSubject()
    const subject = prismicSubject || defaultSubject

    const message = this.renderMessage(this.state.data.composeMessage || '', true)
    const body = encodeURIComponent(message)

    const emailLink = `mailto:${recipient}?subject=${subject}&body=${body}`
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&su=${subject}&body=${body}`

    const options = [
      {
        link: emailLink,
        icon: 'mail-icons.png',
        title: 'Send it via your default email app',
        text: 'This will open whatever you’ve set as the default mail client on your computer or device (for example, Mail on Mac).',
        onClick: (event) => this.submitSendMessage(event, {
          type: 'email',
          title: 'Send it via your email app',
          message: 'This will open whatever you’ve set as the default mail client on your computer or device (for example, Mail on Mac).'
        })
      },
      {
        link: gmailLink,
        icon: 'New_Logo_Gmail-padding.svg', // includes extra padding so it's the same height as mail-icons.png
        title: 'Send it via Gmail',
        text: 'This will open another window, for you to copy the message, so you can paste into the app of your choice.',
        onClick: (event) => this.submitSendMessage(event, {
          type: 'gmail',
          title: 'Send it via Gmail',
          message: 'This will open another window, for you to copy the message, so you can paste into the app of your choice.'
        })
      }
    ]

    let content = this.renderPreActiveText('Tell us how you want to send it, so we can deliver it to you in the format you need.')
    let sectionClass = this.style.section
    let sectionNumberClass = this.style.sectionNumber

    if (this.state.active === 'sendMessage') {
      content = this.renderActiveOptions(options)
      sectionClass = this.style.sectionActive
      sectionNumberClass = this.style.sectionNumberActive
    } else if (this.state.data.sendMessage) {
      content = this.renderCompletedSectionSummary(this.state.data.sendMessage) // not really
      sectionNumberClass = this.style.sectionDone
    }

    return (<div className={sectionClass}>
      <h4 className={this.style.sectionTitle}>
        <span className={sectionNumberClass}>4</span>Send message
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
    let sectionClass = this.style.section
    let sectionNumberClass = this.style.sectionNumber

    if (this.state.active === 'selectStyle') {
      content = this.renderActiveOptions(options)
      sectionClass = this.style.sectionActive
      sectionNumberClass = this.style.sectionNumberActive
    } else if (this.state.data.selectStyle) {
      content = this.renderCompletedSectionSummary(this.state.data.selectStyle) // not really
      sectionNumberClass = this.style.sectionDone
    }

    return (<div className={sectionClass}>
      <h4 className={this.style.sectionTitle}>
        <span className={sectionNumberClass}>2</span>Select style
      </h4>
      {content}
    </div>)
  }

  renderTooltip (tooltipTag) {
    const tooltip = this.state.tooltips.find(tooltip => tooltip.tags.includes(tooltipTag))
    if (!tooltip || this.state.active !== tooltipTag) {
      return ('')
    }
    return (<div className={this.style.tooltipFloating}>
      <Tooltip {...tooltip} />
    </div>)
  }

  submitComposeMessage () {
    const composeMessage = this.state.tempMessage || this.getComposeMessageBaseText()
    const data = merge(this.state.data, {composeMessage})
    const active = 'sendMessage'
    this.saveAndPostData({active, data})
  }

  submitSelectLength (selectLength) {
    const data = merge(this.state.data, {selectLength})
    const active = 'selectStyle'
    this.saveAndPostData({active, data})
  }

  submitSelectStyle (selectStyle) {
    const data = merge(this.state.data, {selectStyle})
    const active = 'composeMessage'
    this.saveAndPostData({active, data})
  }

  submitSendMessage (event, sendMessage) {
    event.preventDefault()
    const link = event.currentTarget.href

    if (link) {
      window.open(link)
    }

    const data = merge(this.state.data, {sendMessage})
    const active = 'nextSteps'
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

  render () {
    const recipientName = `${get(this.props, 'recipient.firstName', '')} ${get(this.props, 'recipient.lastName', '')}`
    return (
      <Form className={this.style.pageBody} method='POST'>
        <input type='hidden' name='_csrf' value={this.props.csrfToken} />
        <PageHeader
          title={get(this.props, 'job.title')}
          subtitle={<span>@ <Link className={this.style.companyLink} to={'/'}>{get(this.props, 'company.name')}</Link></span>}
        />
        <h3 className={this.style.pageHeadline}>Sending a message to {recipientName}</h3>
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
