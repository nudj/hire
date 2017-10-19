const React = require('react')
const get = require('lodash/get')
const templater = require('../../lib/templater')
const getStyle = require('./style.css')

const ConversationBox = (props) => {
  const style = getStyle()
  const conversation = get(props, 'conversationMessages', [])

  return (
    <div className={style.conversationBox}>
      {conversation.map(message => {
        const renderOptions = {
          template: message.body,
          pify: (para, index, margin = 0) => `<p class='${style.conversationParagraph}' key='${message.id}-para${index}' style="margin-top:${1.5 * margin}rem;">${para.join('')}</p>`
        }
        const body = templater.render(renderOptions).join('\n\n')
        const isRecipient = message.sender.includes(props.recipient.email) // Recipient's address is known, hirer's gmail-specific address is less certain
        const sender = isRecipient ? props.recipient : props.person
        const messageStyle = isRecipient ? style.recipientMessage : style.userMessage

        return (
          <div className={style.messageContainer} key={`${message.id}-container`}>
            <div key={`${message.id}-name`} style={{ backgroundColor: 'magenta', height: '100px', width: '100px', float: 'right', alignContent: 'center' }}>
              <p style={{ textAlign: '' }} key={`${message.id}-sender`}>{`${sender.firstName} ${sender.lastName}`}</p>
            </div>
            <div className={messageStyle} key={`${message.id}-message`}>
              <p key={`${message.id}-date`}>{message.date}</p>
              <p key={`${message.id}-body`} dangerouslySetInnerHTML={{ __html: body }} />
            </div>
          </div>
        )
      })}
      <div className={style.messageInput}>
        <input type='text' onChange={props.onDraftChange} placeholder='Compose message' />
        <input type='button' onClick={props.onSendMessage(conversation)} className={style.confirmButton} value='Send' />
      </div>
    </div>
  )
}

module.exports = ConversationBox
