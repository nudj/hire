const React = require('react')
const get = require('lodash/get')
const merge = require('lodash/merge')
const { Link } = require('react-router-dom')

const PageHeader = require('../page-header/page-header')
const Tooltip = require('../tooltip/tooltip')

const getStyle = require('./compose-external-page.css')

const PrismicReact = require('../../lib/prismic-react')

module.exports = class ComposePage extends React.Component {
  constructor (props) {
    super(props)
    this.style = getStyle()

    const active = 'selectLength'
    const data = {}
    const messages = props.messages
    const tooltips = props.tooltips

    this.state = {active, data, messages, tooltips}
    // recipients: props.recipients
  }

  fakeClick () {
    window.alert('click')
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
    return (<li className={this.style.activeOption} key={index}>
      <a className={this.style.activeOptionAction} onClick={option.onClick.bind(this)}>
        <span className={option.iconEmoji ? this.style.activeOptionIconEmoji : this.style.activeOptionIcon}>{option.iconEmoji || 'x'}</span>
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
      content = (<div className={this.style.activeContainer}>
        <p className={this.style.activeContainerTitle}>Congrats on sending your first message!<br /> What would you like to do next?</p>
        <Link to={'/jobs'} className={this.style.buttonSecondary}>Go to dashboard</Link>
        <Link to={`/jobs/${get(this.props, 'job.slug')}`} className={this.style.buttonPrimary}>Send another nudj</Link>
      </div>)
    }

    return (<div className={this.style.section}>
      <h4 className={this.style.sectionTitle}>Next steps</h4>
      {content}
    </div>)
  }

  renderSectionLength () {
    const options = [
      {
        title: 'Short and sweet',
        text: 'For getting straight to the point.',
        onClick: () => this.submitSelectLength({
          type: 'short',
          title: 'Short and sweet',
          message: 'For getting straight to the point.'
        })
      },
      {
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
      <h4 className={this.style.sectionTitle}>Select length</h4>
      {content}
    </div>)
  }

  renderSectionComposeMessage () {
    let content = this.renderPreActiveText('Compose your masterpiece here.')
    let composeMessageContent = ''

    if (this.state.active === 'composeMessage') {
      composeMessageContent = this.getComposeMessageBaseText()
      content = (composeMessageContent)
    } else if (this.state.data.composeMessage) {
      content = this.renderCompletedSectionSummary(this.state.data.composeMessage) // not really
    }

    // {/* composer */}
    // {/* composed message */}
    // <div className={this.style.completedSectionSummaryMessage}>
    //   <p className={this.style.completedSectionSummaryText}>Hi  Alex,</p>
    //   <p className={this.style.completedSectionSummaryText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tincidunt molestie sollicitudin. Lorem ipsum dolor sit amet…Sed ac ullamcorper nunc. Vivamus lectus erat, mattis a neque vitae, faucibus aliquam magna.</p>
    //   <p className={this.style.completedSectionSummaryText}>Sed hendrerit ultricies finibus. Nam ut elementum turpis. Duis tempor mauris venenatis nunc interdum, eu… ullamcorper magna tincidunt.</p>
    //   <p className={this.style.completedSectionSummaryText}>Maecenas commodo, nulla mollis faucibus auctor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tincidunt molestie sollicitudin. Lorem ipsum    Airbnb    amet, consectetur adipiscing elit. Sed ac ullamcorper nunc. Vivamus lectus erat, mattis a neque vitae, faucibus aliquam magna.</p>
    //   <p className={this.style.completedSectionSummaryText}>Sed hendrerit ultricies finibus. Nam ut elementum turpis. Duis tempor mauris venenatis nunc interdum, eu ullamcorper magna tincidunt.</p>
    //   <p className={this.style.completedSectionSummaryText}>Your name</p>
    // </div>

    return (<div className={this.style.section}>
      <h4 className={this.style.sectionTitle}>Create message</h4>
      {content}
    </div>)
  }

  renderSectionSendMessage () {
    const options = [
      {
        title: 'Send it via your email app',
        text: 'This will open whatever you’ve set as the default mail client on your computer or device<br /> (for example, Mail on Mac).',
        onClick: () => this.submitSendMessage('email')
      },
      {
        title: 'Send it using a message app',
        text: 'This will open another window, for you to copy the message, so you can paste into the app of your choice.',
        onClick: () => this.submitSendMessage('message')
      }
    ]

    let content = this.renderPreActiveText('Tell us how you want to send it, so we can deliver it to you in the format you need.')

    if (this.state.active === 'sendMessage') {
      content = this.renderActiveOptions(options)
    } else if (this.state.data.sendMessage) {
      content = this.renderCompletedSectionSummary(this.state.data.sendMessage) // not really
    }

    return (<div className={this.style.section}>
      <h4 className={this.style.sectionTitle}>Send message</h4>
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
      <h4 className={this.style.sectionTitle}>Select style</h4>
      {content}
    </div>)
  }

  renderTooltip (tooltipTag) {
    const tooltip = this.state.tooltips.find(tooltip => tooltip.tags.includes(tooltipTag))
    if (!tooltip || this.state.active !== tooltipTag) {
      return ('')
    }
    const props = {tooltip}
    return (<Tooltip {...props} />)
  }

  submitComposeMessage (composeMessage) {
    const data = merge({}, this.state.data, {composeMessage})
    const active = 'sendMessage'
    this.setState({active, data})
  }

  submitSelectLength (selectLength) {
    const data = merge({}, this.state.data, {selectLength})
    const active = 'selectStyle'
    this.setState({active, data})
  }

  submitSelectStyle (selectStyle) {
    const data = merge({}, this.state.data, {selectStyle})
    const active = 'composeMessage'
    this.setState({active, data})
  }

  submitSendMessage (sendMessage) {
    const data = merge({}, this.state.data, {sendMessage})
    const active = 'nextSteps'
    this.setState({active, data})
  }

  // renderMessage () {
  //   const message = new PrismicReact(this.state.messages[0])
  //   const props = {message}
  //   return (<Message {...props} />)
  // }

  render () {
    return (
      <form className={this.style.pageBody} method='POST'>
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
      </form>
    )
  }
}
