const React = require('react')
const ReactTextAreaAutosize = require('react-textarea-autosize')
const get = require('lodash/get')
const getStyle = require('./compose-email.css')

const errorLabel = (className, template) => <p className={className}>{template}</p>
const Textarea = ReactTextAreaAutosize.default || ReactTextAreaAutosize

module.exports = (props) => {
  const style = getStyle()
  return (
    <div>
      <div className={style.recipientsWrap}>
        <label className={style.addLabel}>Sending to</label>
        <div className={style.inputWrap}>
          {props.recipientsError ? errorLabel(style.errorLabel, props.recipientsError) : null}
          <input className={style.recipients} id='recipients' name='recipients' value={get(props, 'recipients', '')} onChange={props.onChangeRecipients} onBlur={props.onBlurRecipients} placeholder='Enter your team’s emails here. Use a comma to seperate multiple.' />
        </div>
      </div>
      <div className={style.email}>
        <div className={style.subjectWrap}>
          <label className={style.addLabel} htmlFor='subject'>Subject</label>
          <div className={style.inputWrap}>
            {props.subjectError ? errorLabel(style.errorLabel, props.subjectError) : null}
            {get(props, 'editing') ? <input className={style.subject} type='text' name='subject' value={get(props, 'subject', get(props, 'subjectFallback', ''))} onChange={props.onChangeSubject} id='subject' placeholder='Enter subject here' /> : <div className={style.subject}>{get(props, 'subject', get(props, 'subjectFallback', ''))}</div>}
          </div>
          {get(props, 'js') ? <button className={props.editing ? style.doneButton : style.editButton} onClick={props.onClickEdit}>{props.editing ? 'Done' : 'Edit'}</button> : ''}
        </div>
        <div className={style.templateWrap}>
          <label className={style.messageLabel} htmlFor='template'>Message</label>
          <div className={style.inputWrap}>
            {props.templateError ? errorLabel(style.errorLabel, props.templateError) : null}
            {get(props, 'editing') ? <Textarea className={style.template} name='template' value={get(props, 'template', get(props, 'templateFallback', ''))} onChange={props.onChangeMessage} id='template' placeholder='Enter message here' /> : <div className={style.template}> {props.renderMessage(get(props, 'template', get(props, 'templateFallback', '')))}</div>}
          </div>
        </div>
      </div>
    </div>
  )
}
