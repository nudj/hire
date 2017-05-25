const React = require('react')
const { Link } = require('react-router-dom')
const get = require('lodash/get')
const getStyle = require('./compose-page.css')
const PageHeader = require('../page-header/page-header')
const PrismicReact = require('../../lib/prismic-react')
const templater = require('../../../lib/templater')
const Form = require('../form/form')
const DialogConfirm = require('../dialog-confirm-send-internal/dialog-confirm-send-internal')
const {
  showDialog,
  hideDialog,
  postData
} = require('../../actions/app')

const errorLabel = (className, message) => <p className={className}>{message}</p>

module.exports = class ComposePage extends React.Component {
  constructor (props) {
    super(props)
    this.style = getStyle()

    let prismicCompose = get(props, 'compose') && new PrismicReact(props.compose)
    let composeSubject = (get(this.state, 'subject', prismicCompose && prismicCompose.fragmentToText({fragment: 'composemessage.composesubject'})) || '')
    let composeMessage = (get(this.state, 'message', prismicCompose && prismicCompose.fragmentToText({fragment: 'composemessage.composetext'})) || '')

    this.state = {
      recipients: get(props, 'form.recipients'),
      subject: get(props, 'form.subject'),
      subjectFallback: composeSubject,
      message: get(props, 'form.template'),
      messageFallback: composeMessage,
      editing: false,
      sending: false
    }
    this.onClickEdit = this.onClickEdit.bind(this)
    this.onChangeRecipients = this.onChangeRecipients.bind(this)
    this.onChangeSubject = this.onChangeSubject.bind(this)
    this.onChangeMessage = this.onChangeMessage.bind(this)
    this.renderMessage = this.renderMessage.bind(this)
    this.tagify = this.tagify.bind(this)
    this.onClickSend = this.onClickSend.bind(this)
    this.onClickConfirm = this.onClickConfirm.bind(this)
    this.onClickCancel = this.onClickCancel.bind(this)
  }
  componentWillReceiveProps (props) {
    let prismicCompose = get(props, 'compose') && new PrismicReact(props.compose)
    let composeSubject = (get(this.state, 'subject', prismicCompose && prismicCompose.fragmentToText({fragment: 'composemessage.composesubject'})) || '')
    let composeMessage = (get(this.state, 'message', prismicCompose && prismicCompose.fragmentToText({fragment: 'composemessage.composetext'})) || '')

    this.setState({
      recipients: get(this.state, 'recipients', get(props, 'form.recipients')),
      subject: get(this.state, 'subject', get(props, 'form.subject')),
      subjectFallback: composeSubject,
      message: get(this.state, 'message', get(props, 'form.template')),
      messageFallback: composeMessage
    })
  }
  onClickEdit (event) {
    event.preventDefault()
    this.setState({
      editing: !this.state.editing
    })
  }
  onChangeRecipients (event) {
    this.setState({
      recipients: event.target.value
    })
  }
  onChangeSubject (event) {
    this.setState({
      subject: event.target.value
    })
  }
  onChangeMessage (event) {
    this.setState({
      message: event.target.value
    })
  }
  tagify (contents, ok) {
    return `<span class='${ok ? this.style.tagOk : this.style.tagError}'>${contents}</span>`
  }
  renderMessage (template) {
    return templater.render({
      template: template || get(this.state, 'message', ''),
      data: {
        refereeName: 'First Name',
        job: {
          title: get(this.props, 'job.title'),
          bonus: get(this.props, 'job.bonus')
        },
        companyName: get(this.props, 'company.name'),
        link: 'https://nudj.co/company/job',
        personName: `${get(this.props, 'person.firstName')} ${get(this.props, 'person.lastName')}`
      },
      tagify: this.tagify
    })
  }
  onClickConfirm () {
    this.setState({
      sending: true
    })
    this.props.dispatch(postData({
      url: `/jobs/${get(this.props, 'job.slug')}/internal`,
      data: {
        recipients: get(this.state, 'recipients', ''),
        subject: get(this.state, 'subject', get(this.state, 'subjectFallback', '')),
        template: get(this.state, 'message', get(this.state, 'messageFallback', ''))
      }
    }))
    this.props.dispatch(hideDialog())
  }
  onClickCancel () {
    this.props.dispatch(hideDialog())
  }
  onClickSend (event) {
    event.preventDefault()
    this.props.dispatch(showDialog(<DialogConfirm {...this.props} onClickConfirm={this.onClickConfirm} onClickCancel={this.onClickCancel} />))
  }
  renderSending () {
    return <div>Sending</div>
  }
  renderSuccess () {
    return <div>Success</div>
  }
  renderComposer () {
    const error = get(this.props, 'error')
    return (
      <Form className={this.style.pageBody} action={`/jobs/${get(this.props, 'job.slug')}/internal`} method='POST'>
        <input type='hidden' name='_csrf' value={this.props.csrfToken} />
        <PageHeader
          title={<Link to={`/jobs/${get(this.props, 'job.slug')}`}>{get(this.props, 'job.title')}</Link>}
          subtitle={<span>@ <Link to={'/jobs'}>{get(this.props, 'company.name')}</Link></span>}
        >
          <button className={this.style.submit} onClick={this.onClickSend}>Send message</button>
        </PageHeader>
        <h3 className={this.style.pageHeadline}>Now compose your kick-ass message...</h3>
        <div className={this.style.pageContent}>
          <div className={this.style.pageMain}>
            <div className={this.style.recipientsWrap}>
              <label className={this.style.addLabel}>Sending to</label>
              <input className={this.style.recipients} id='recipients' name='recipients' value={get(this.state, 'recipients', '')} onChange={this.onChangeRecipients} />
              {error && error.type === 'invalid-email' ? errorLabel(this.style.errorLabel, error.message) : ''}
            </div>
            <div className={this.style.email}>
              <div className={this.style.subjectWrap}>
                <label className={this.style.addLabel} htmlFor='subject'>Subject</label>
                {get(this.state, 'editing') ? <input className={this.style.subject} type='text' name='subject' value={get(this.state, 'subject', get(this.state, 'subjectFallback', ''))} onChange={this.onChangeSubject} id='subject' /> : <div className={this.style.subject}>{get(this.state, 'subject', get(this.state, 'subjectFallback', ''))}</div>}
                <button className={this.style.editing} onClick={this.onClickEdit}>{this.state.editing ? 'Done' : 'Edit'}</button>
              </div>
              <div className={this.style.messageWrap}>
                <label className={this.style.addLabel} htmlFor='message'>Message</label>
                {get(this.state, 'editing') ? <textarea className={this.style.message} name='template' value={get(this.state, 'message', get(this.state, 'messageFallback', ''))} onChange={this.onChangeMessage} id='message' /> : <div className={this.style.message} dangerouslySetInnerHTML={{ __html: this.renderMessage(get(this.state, 'message', get(this.state, 'messageFallback', ''))) }} />}
              </div>
            </div>
          </div>
          <div className={this.style.pageSidebar}>
            Sidebar...
          </div>
        </div>
      </Form>
    )
  }
  render () {
    let page
    switch (true) {
      case get(this.state, 'sending'):
        page = this.renderSending()
        break
      case !!get(this.props, 'messages'):
        page = this.renderSuccess()
        break
      default:
        page = this.renderComposer()
    }
    return page
  }
}
