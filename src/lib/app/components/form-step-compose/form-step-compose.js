const React = require('react')
const Textarea = require('react-textarea-autosize').default

const PrismicReact = require('../../lib/prismic-react')
const templater = require('../../../lib/templater')
const FormStep = require('../form-step/form-step')

const getStyle = require('./form-step-compose.css')

class FormStepCompose extends React.Component {
  constructor (props) {
    super(props)
    this.style = getStyle()
    this.state = {}
    this.onSubmitStep = props.onSubmitStep('composeMessage')
    this.changedMessage = this.changedMessage.bind(this)
  }
  componentDidUpdate () {
    const tempMessage = this.getComposeMessageBaseText()
    if (!this.state.tempMessage && tempMessage) {
      this.setState({tempMessage})
    }
  }
  render () {
    return <FormStep
      {...this.props}
      title='Create message'
      placeholder='Compose your masterpiece here.'
      content={() => this.renderComposeMessage(this.props.pageData)}
      completed={this.renderComposedMessage}
    />
  }
  renderComposeMessage () {
    const tempMessage = this.state.tempMessage || this.getComposeMessageBaseText()

    return (<div className={this.style.activeContainerCentered}>
      <div className={this.style.messageContainer}>
        <Textarea className={this.style.messageTextarea} name='template' value={tempMessage} onChange={this.changedMessage} id='message' />
      </div>
      <a className={this.style.composeMessageSave} onClick={this.onSubmitStep}>Next</a>
    </div>)
  }

  renderComposedMessage (messageContent) {
    const message = renderMessage(messageContent)
    return (<div className={this.style.completedSectionSummary}>
      <div className={this.style.completedSectionSummaryMessage} dangerouslySetInnerHTML={{ __html: message }} />
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
          bonus: get(this.props, 'job.bonus', ''),
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

  changedMessage (event) {
    const tempMessage = event.target.value
    this.setState({tempMessage})
  }

  getComposeMessageBase () {
    if (!this.props.length || !this.props.style) {
      return ''
    }

    if (!this.props.messages || !this.props.messages.length) {
      return ''
    }

    const lengthTag = this.props.length.type
    const styleTag = this.props.style.type
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
