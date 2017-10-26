const React = require('react')
const Textarea = require('react-textarea-autosize')
const { ThreeBounce } = require('better-react-spinkit')
const get = require('lodash/get')
const linkify = require('linkifyjs/html')
const templater = require('../../lib/templater')
const getStyle = require('./style.css')

class ConversationBox extends React.Component {
  constructor (props) {
    super(props)
    this.style = getStyle()
    this.state = {

    }
    this.renderMessage = this.renderMessage.bind(this)
    this.renderActiveConversation = this.renderActiveConversation.bind(this)
  }

  renderMessage (message, fontColor) {
    const options = {
      template: message.body,
      pify: (para, index, margin = 0) => `<p style='color: ${fontColor};' class='${this.style.conversationParagraph}' key='${message.id}-para${index}'>${para.join('')}</p>`
    }
    const renderedMessage = templater.render(options).join('\n\n')

    return linkify(renderedMessage, { defaultProtocol: 'https' })
  }

  renderActiveConversation (conversation) {
    const allMessages = conversation.map(message => {
      const isRecipient = message.sender.includes(this.props.recipient.email) // Recipient's address is known, hirer's gmail-specific address is less certain
      const sender = isRecipient ? this.props.recipient : this.props.person
      const id = message.id

      let messageBubbleColor = { backgroundColor: '#0B1D27' }
      let fontColor = '#FFF'
      let layoutStyle = { float: 'right' }

      if (isRecipient) {
        messageBubbleColor = { backgroundColor: '#E9E9E8' }
        fontColor = '#000'
        layoutStyle = { float: 'left' }
      }

      const body = this.renderMessage(message, fontColor)
      return (
        <div className={this.style.messageContainer} key={`${id}-container`}>
          <div key={`${id}-name`} style={layoutStyle} className={this.style.nameSection}>
            <span key={`${id}-firstName`} className={this.style.name}>{isRecipient ? sender.firstName : 'You'}</span>
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

    return (
      <div className={this.style.conversationBox}>
        <div className={this.style.header}>
          <div className={this.style.main}>
            <h1 className={this.style.title}>{`${get(this.props, 'recipient.firstName', '')} ${get(this.props, 'recipient.lastName', '')}`}</h1>
            <h2 className={this.style.subtitle}>{`${get(this.props, 'recipient.title', '')} @ ${get(this.props, 'recipient.company')}`}</h2>
          </div>
        </div>
        {allMessages}
      </div>
    )
  }

  render () {
    const conversation = get(this.props, 'conversationMessages', [])

    const buttonText = get(this.props, 'loading') ? (<ThreeBounce color='white' />) : 'Send'
    return (
      <div className={this.style.conversationBoxContainer}>
        {this.renderActiveConversation(conversation)}
        <div className={this.style.messageInputContainer}>
          <div className={this.style.textareaContainer}>
            <Textarea className={this.style.messageTextarea} name='template' placeholder='Compose message' onChange={this.props.onDraftChange} />
          </div>
          <div className={this.style.buttonContainer}>
            <button type='button' onClick={this.props.onSendMessage(conversation)} className={this.style.confirmButton}>{buttonText}</button>
          </div>
        </div>
      </div>
    )
  }
}

module.exports = ConversationBox
