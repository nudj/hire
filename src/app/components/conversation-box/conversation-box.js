const React = require('react')
const Textarea = require('react-textarea-autosize')
const { ThreeBounce } = require('better-react-spinkit')
const get = require('lodash/get')
const Linkify = require('linkifyjs/react')
const templater = require('../../lib/templater')
const getStyle = require('./style.css')

const ConversationBox = (props) => {
  const style = getStyle()
  const conversation = get(props, 'conversationMessages', [])
  const buttonText = get(props, 'loading') ? (<ThreeBounce color='white' />) : 'Send'

  const pify = (textStyle, key) => {
    const options = { className: style.messageLink }
    return (para, index, margin = 0) => <Linkify className={textStyle} key={`${key}-para${index}`} tagName='p' options={options}>{para.join('')}</Linkify>
  }

  const renderIndividualMessage = (message) => {
    const isRecipient = message.sender.includes(props.recipient.email) // Recipient's address is known, hirer's gmail-specific address is less certain
    const messageStyle = isRecipient ? 'recipient' : 'hirer'
    const key = message.id
    const textStyle = style[`${messageStyle}Paragraph`]
    const options = {
      template: message.body,
      pify: pify(textStyle, key),
      brify: (index) => <br key={`br${index}`} />
    }
    const renderedMessage = templater.render(options)

    return (
      <div className={style.messageContainer} key={`${key}-container`}>
        <div key={`${key}-name`} className={style[`${messageStyle}NameSection`]}>
          <span key={`${key}-firstName`} className={style.name}>{isRecipient ? get(props, 'recipient.firstName', '') : 'You'}</span>
        </div>
        <div key={`${key}-message`} className={style[`${messageStyle}Message`]}>
          <div className={style[`${messageStyle}MessageBubble`]} key={`${key}-messageBody`}>
            {renderedMessage}
          </div>
          <div className={style[`${messageStyle}MessageDate`]} key={`${key}-date`}>
            {message.date}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={style.conversationBoxContainer}>
      <div className={style.headerContainer}>
        <div className={style.header}>
          <div className={style.main}>
            <h1 className={style.title}>{`${get(props, 'recipient.firstName', '')} ${get(props, 'recipient.lastName', '')}`}</h1>
            <h2 className={style.subtitle}>{`${get(props, 'recipient.title', '')} @ ${get(props, 'recipient.company')}`}</h2>
          </div>
        </div>
      </div>
      <div className={style.conversationBox}>
        {conversation.map(message => renderIndividualMessage(message))}
      </div>
      <div className={style.messageInputContainer}>
        <div className={style.inputContainer}>
          <div className={style.textareaContainer}>
            <Textarea className={style.messageTextarea} name='template' placeholder='Write message' onChange={props.onDraftChange} />
          </div>
          <div className={style.buttonContainer}>
            <button onClick={props.onSendMessage(conversation)} className={style.confirmButton} disabled={!get(props, 'externalComposePage.draft')} >{buttonText}</button>
          </div>
        </div>
      </div>
    </div>
  )
}

module.exports = ConversationBox
