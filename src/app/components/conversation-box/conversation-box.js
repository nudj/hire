const React = require('react')
const Textarea = require('react-textarea-autosize')
const get = require('lodash/get')
const linkify = require('linkifyjs/html')
const templater = require('../../lib/templater')
const getStyle = require('./style.css')

const actions = require('@nudj/framework/actions')
const { showDialog } = actions.app

class ConversationBox extends React.Component {
  constructor (props) {
    super(props)
    this.style = getStyle()
    this.state = {

    }
    this.renderGmailMessage = this.renderGmailMessage.bind(this)
    this.renderTaggedMessage = this.renderTaggedMessage.bind(this)
  }

  componentDidMount () {
    if (get(this.props, 'externalMessage.sendMessage') === 'EMAIL' && !get(this.props, 'googleAuthenticated')) {
      const messageId = get(this.props, 'externalMessage.id')
      const jobSlug = get(this.props, 'job.slug')
      const url = `/jobs/${jobSlug}/external/${messageId}/authenticate`

      this.props.dispatch(showDialog({
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
        dialog: get(this.props, 'authenticationPromptDialog', '')
      }))
    }
  }

  renderGmailMessage (message, fontColor) {
    const options = {
      template: message.body,
      pify: (para, index, margin = 0) => `<p style='color: ${fontColor};' class='${this.style.conversationParagraph}' key='${message.id}-para${index}'>${para.join('')}</p>`
    }
    const renderedMessage = templater.render(options).join('\n\n')

    return linkify(renderedMessage, { defaultProtocol: 'https' })
  }

  renderTaggedMessage (message) {
    const companySlug = get(this.props, 'company.slug', '')
    const jobSlug = get(this.props, 'job.slug', '')
    const referralId = get(this.props, 'referral.id', '')

    const referralLink = `https://${get(this.props, 'web.hostname')}/jobs/${companySlug}+${jobSlug}+${referralId}`
    const options = {
      template: message,
      data: {
        company: {
          name: get(this.props, 'company.name', '')
        },
        job: {
          bonus: get(this.props, 'job.bonus', ''),
          link: referralLink,
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
      },
      pify: (para, index, margin = 0) => `<p style='color: white;' class='${this.style.conversationParagraph}' key='${message.id}-para${index}'>${para.join('')}</p>`
    }

    const renderedMessage = templater.render(options).join('\n\n')
    return linkify(renderedMessage, { defaultProtocol: 'https' })
  }

  render () {
    const conversation = get(this.props, 'conversationMessages', [])
    const originalMessage = get(this.props, 'externalMessage.composeMessage', '')

    const activeConversationBody = conversation.map(message => {
      const isRecipient = message.sender.includes(this.props.recipient.email) // Recipient's address is known, hirer's gmail-specific address is less certain
      const sender = isRecipient ? this.props.recipient : this.props.person
      const id = message.id

      let messageBubbleColor = { backgroundColor: '#6681aa' }
      let fontColor = '#FFF'
      let layoutStyle = { float: 'right' }

      if (isRecipient) {
        messageBubbleColor = { backgroundColor: '#f7f7f6' }
        fontColor = '#000'
        layoutStyle = { float: 'left' }
      }

      const body = this.renderGmailMessage(message, fontColor)
      return (
        <div className={this.style.messageContainer} key={`${id}-container`}>
          <div key={`${id}-name`} style={layoutStyle} className={this.style.nameSection}>
            <span key={`${id}-firstName`} className={this.style.name}>{sender.firstName}</span>
            <span key={`${id}-lastName`} className={this.style.name}>{sender.lastName}</span>
          </div>
          <div key={`${id}-message`} style={layoutStyle} className={this.style.message}>
            <div style={messageBubbleColor} className={this.style.messageBody} key={`${id}-messageBody`}>
              <p key={`${id}-body`} dangerouslySetInnerHTML={{ __html: body }} />
            </div>
            <div style={layoutStyle} className={this.style.messageDate} key={`${id}-date`}>
              {message.date}
            </div>
          </div>
        </div>
      )
    })

    const staticConversationBody = (message) => {
      const body = this.renderTaggedMessage(message)
      const layoutStyle = { float: 'right' }
      const messageBubbleColor = { backgroundColor: '#6681aa' }

      return (
        <div className={this.style.messageContainer}>
          <div style={layoutStyle} className={this.style.nameSection}>
            <span className={this.style.name}>{this.props.person.firstName}</span>
            <span className={this.style.name}>{this.props.person.lastName}</span>
          </div>
          <div style={layoutStyle} className={this.style.message}>
            <div style={messageBubbleColor} className={this.style.messageBody}>
              <p dangerouslySetInnerHTML={{ __html: body }} />
            </div>
          </div>
        </div>
      )
    }

    const authenticated = get(this.props, 'externalMessage.sendMessage') !== 'EMAIL'
    const conversationBody = authenticated ? activeConversationBody : staticConversationBody(originalMessage)
    return (
      <div>
        <div className={this.style.conversationBox}>
          {conversationBody}
        </div>
        <div className={this.style.messageInputContainer}>
          <div className={this.style.textareaContainer}>
            <Textarea className={this.style.messageTextarea} name='template' placeholder={authenticated ? 'Compose message' : 'Want to continue your conversation here?  Next time, try sending with Gmail!'} onChange={this.props.onDraftChange} disabled={!authenticated} />
          </div>
          <div className={this.style.buttonContainer}>
            <input type='button' onClick={this.props.onSendMessage(conversation)} className={this.style.confirmButton} value='Send' disabled={!authenticated} />
          </div>
        </div>
      </div>
    )
  }
}

module.exports = ConversationBox
