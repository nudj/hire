const React = require('react')
const Textarea = require('react-textarea-autosize')
const get = require('lodash/get')
const linkify = require('linkifyjs/html')
const templater = require('../../lib/templater')
const getStyle = require('./style.css')

const ConversationBox = (props) => {
  const style = getStyle()
  const conversation = get(props, 'conversationMessages', [])
  const originalMessage = get(props, 'externalMessage.composeMessage', '')

  const renderGmailMessage = (message, fontColor) => {
    const options = {
      template: message.body,
      pify: (para, index, margin = 0) => `<p style='color: ${fontColor};' class='${style.conversationParagraph}' key='${message.id}-para${index}'>${para.join('')}</p>`
    }
    const renderedMessage = templater.render(options).join('\n\n')

    return linkify(renderedMessage, { defaultProtocol: 'https' })
  }

  const renderTaggedMessage = (message) => {
    const companySlug = get(props, 'company.slug', '')
    const jobSlug = get(props, 'job.slug', '')
    const referralId = get(props, 'referral.id', '')

    const referralLink = `https://${get(props, 'web.hostname')}/jobs/${companySlug}+${jobSlug}+${referralId}`
    const options = {
      template: message,
      data: {
        company: {
          name: get(props, 'company.name', '')
        },
        job: {
          bonus: get(props, 'job.bonus', ''),
          link: referralLink,
          title: get(props, 'job.title', '')
        },
        recipient: {
          firstname: get(props, 'recipient.firstName', ''),
          lastname: get(props, 'recipient.lastName', '')
        },
        sender: {
          firstname: get(props, 'person.firstName', ''),
          lastname: get(props, 'person.lastName', '')
        }
      },
      pify: (para, index, margin = 0) => `<p style='color: white;' class='${style.conversationParagraph}' key='${message.id}-para${index}'>${para.join('')}</p>`
    }

    const renderedMessage = templater.render(options).join('\n\n')
    return linkify(renderedMessage, { defaultProtocol: 'https' })
  }

  const activeConversationBody = conversation.map(message => {
    const isRecipient = message.sender.includes(props.recipient.email) // Recipient's address is known, hirer's gmail-specific address is less certain
    const sender = isRecipient ? props.recipient : props.person
    const id = message.id

    let messageBubbleColor = { backgroundColor: '#6681aa' }
    let fontColor = '#FFF'
    let layoutStyle = { float: 'right' }

    if (isRecipient) {
      messageBubbleColor = { backgroundColor: '#f7f7f6' }
      fontColor = '#000'
      layoutStyle = { float: 'left' }
    }

    const body = renderGmailMessage(message, fontColor)
    return (
      <div className={style.messageContainer} key={`${id}-container`}>
        <div key={`${id}-name`} style={layoutStyle} className={style.nameSection}>
          <span key={`${id}-firstName`} className={style.name}>{sender.firstName}</span>
          <span key={`${id}-lastName`} className={style.name}>{sender.lastName}</span>
        </div>
        <div key={`${id}-message`} style={layoutStyle} className={style.message}>
          <div style={messageBubbleColor} className={style.messageBody} key={`${id}-messageBody`}>
            <p key={`${id}-body`} dangerouslySetInnerHTML={{ __html: body }} />
          </div>
          <div style={layoutStyle} className={style.messageDate} key={`${id}-date`}>
            {message.date}
          </div>
        </div>
      </div>
    )
  })

  const staticConversationBody = (message) => {
    const body = renderTaggedMessage(message)
    const layoutStyle = { float: 'right' }
    const messageBubbleColor = { backgroundColor: '#6681aa' }

    return (
      <div className={style.messageContainer}>
        <div style={layoutStyle} className={style.nameSection}>
          <span className={style.name}>{props.person.firstName}</span>
          <span className={style.name}>{props.person.lastName}</span>
        </div>
        <div style={layoutStyle} className={style.message}>
          <div style={messageBubbleColor} className={style.messageBody}>
            <p dangerouslySetInnerHTML={{ __html: body }} />
          </div>
        </div>
      </div>
    )
  }

  const authenticated = get(props, 'externalMessage.sendMessage') !== 'EMAIL'
  const conversationBody = authenticated ? activeConversationBody : staticConversationBody(originalMessage)

  return (
    <div>
      <div className={style.conversationBox}>
        {conversationBody}
      </div>
      <div className={style.messageInputContainer}>
        <div className={style.textareaContainer}>
          <Textarea className={style.messageTextarea} name='template' placeholder={authenticated ? 'Compose message' : 'Authenticate and send with Gmail to carry on the conversation here!'} onChange={props.onDraftChange} disabled={!authenticated} />
        </div>
        <div className={style.buttonContainer}>
          <input type='button' onClick={props.onSendMessage(conversation)} className={style.confirmButton} value='Send' disabled={!authenticated} />
        </div>
      </div>
    </div>
  )
}

module.exports = ConversationBox
