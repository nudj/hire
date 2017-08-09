const React = require('react')
const get = require('lodash/get')
const Textarea = require('react-textarea-autosize')

const PrismicReact = require('../../lib/prismic-react')
const templater = require('../../../lib/templater')
const FormStep = require('../form-step/form-step')

const getStyle = require('./form-step-compose.css')

class FormStepCompose extends React.Component {
  constructor (props) {
    super(props)
    this.style = getStyle()
    this.state = {}
    this.onSubmit = this.onSubmit.bind(this)
    this.onChangeMessage = this.onChangeMessage.bind(this)
    this.renderComposeMessage = this.renderComposeMessage.bind(this)
    this.renderComposedMessage = this.renderComposedMessage.bind(this)
  }

  render () {
    return <FormStep
      {...this.props}
      title='Create message'
      placeholder='Compose your masterpiece here.'
      content={this.renderComposeMessage}
      completed={this.renderComposedMessage}
    />
  }

  renderMessage (content, textOnly) {
    const companySlug = get(this.props, 'pageData.company.slug', '')
    const jobSlug = get(this.props, 'pageData.job.slug', '')
    const referralId = get(this.props, 'pageData.referral.id', '')

    const referralLink = `https://nudj.co/jobs/${companySlug}+${jobSlug}+${referralId}`

    const options = {
      template: content,
      data: {
        company: {
          name: get(this.props, 'pageData.company.name', '')
        },
        job: {
          bonus: get(this.props, 'pageData.job.bonus', ''),
          link: referralLink,
          title: get(this.props, 'pageData.job.title', '')
        },
        recipient: {
          firstname: get(this.props, 'pageData.recipient.firstName', ''),
          lastname: get(this.props, 'pageData.recipient.lastName', '')
        },
        sender: {
          firstname: get(this.props, 'pageData.person.firstName', ''),
          lastname: get(this.props, 'pageData.person.lastName', '')
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
    const message = this.props.composeMessage || this.getComposeMessageBaseText()

    return (<div className={this.style.activeContainerCentered}>
      <div className={this.style.messageContainer}>
        <Textarea className={this.style.messageTextarea} name='template' value={message} onChange={this.onChangeMessage} id='message' />
      </div>
      <a className={this.style.composeMessageSave} onClick={this.onSubmit}>Next</a>
    </div>)
  }

  onChangeMessage (event) {
    event.stopPropagation()
    this.props.onChangeStep(event.target.value)
  }

  onSubmit (event) {
    event.stopPropagation()
    this.props.onSubmitStep(this.props.composeMessage || this.getComposeMessageBaseText())
  }

  renderComposedMessage (messageContent) {
    const message = this.renderMessage(messageContent)
    return (<div className={this.style.completedSectionSummary}>
      <div className={this.style.completedSectionSummaryMessage} dangerouslySetInnerHTML={{ __html: message }} />
    </div>)
  }

  getComposeMessageBase () {
    if (!this.props.selectLength || !this.props.selectStyle) {
      return ''
    }

    if (!this.props.messages.length) {
      return ''
    }

    const lengthTag = this.props.selectLength.toLowerCase()
    const styleTag = this.props.selectStyle.toLowerCase()
    const prismicMessage = this.props.messages.find(message => message.tags.includes(lengthTag) && message.tags.includes(styleTag))
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
}

module.exports = FormStepCompose
