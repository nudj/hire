const React = require('react')
const { Link } = require('react-router-dom')
const get = require('lodash/get')
const some = require('lodash/some')
const values = require('lodash/values')
const getStyle = require('./compose-page.css')
const PageHeader = require('../page-header/page-header')
const PrismicReact = require('../../lib/prismic-react')
const templater = require('../../../lib/templater')
const { merge } = require('../../../lib')
const Form = require('../form/form')
const DialogConfirm = require('../dialog-confirm-send-internal/dialog-confirm-send-internal')
const Tooltip = require('../tooltip/tooltip')
const {
  showDialog,
  hideDialog,
  postData
} = require('../../actions/app')
const { emails: validators } = require('../../../lib/validators')

const errorLabel = (className, template) => <p className={className}>{template}</p>

module.exports = class ComposePage extends React.Component {
  constructor (props) {
    super(props)
    this.style = getStyle()

    let prismicCompose = get(props, 'compose') && new PrismicReact(props.compose)
    let composeSubject = (get(this.state, 'subject', prismicCompose && prismicCompose.fragmentToText({fragment: 'composemessage.composesubject'})) || '')
    let composeMessage = (get(this.state, 'message', prismicCompose && prismicCompose.fragmentToText({fragment: 'composemessage.composetext'})) || '').replace('\r\n', '\n')

    this.state = {
      recipients: get(props, 'form.recipients.value'),
      recipientsError: get(props, 'form.recipients.error', false),
      subject: get(props, 'form.subject.value'),
      subjectFallback: composeSubject,
      subjectError: get(props, 'form.subject.error', false),
      template: get(props, 'form.template.value'),
      templateFallback: composeMessage,
      templateError: get(props, 'form.template.error', false),
      editing: true,
      error: get(props, 'error', false)
    }
    this.validateRecipients = this.validateRecipients.bind(this)
    this.validateEmail = this.validateEmail.bind(this)
    this.isInvalid = this.isInvalid.bind(this)
    this.onClickEdit = this.onClickEdit.bind(this)
    this.onChangeRecipients = this.onChangeRecipients.bind(this)
    this.onChangeSubject = this.onChangeSubject.bind(this)
    this.onChangeMessage = this.onChangeMessage.bind(this)
    this.renderMessage = this.renderMessage.bind(this)
    this.tagify = this.tagify.bind(this)
    this.pify = this.pify.bind(this)
    this.chunkify = this.chunkify.bind(this)
    this.onClickSend = this.onClickSend.bind(this)
    this.onClickConfirm = this.onClickConfirm.bind(this)
    this.onClickCancel = this.onClickCancel.bind(this)
    this.onBlurRecipients = this.onBlurRecipients.bind(this)
  }
  componentDidMount () {
    this.setState({
      editing: false,
      js: true
    })
  }
  validateRecipients () {
    return validators.recipients(get(this.state, 'recipients'))
  }
  validateEmail () {
    return ['subject', 'template'].reduce((newState, key) => {
      let value = get(this.state, key, get(this.state, `${key}Fallback`))
      newState[`${key}Error`] = validators[key](value)
      return newState
    }, {})
  }
  isInvalid () {
    return ['recipients', 'subject', 'template'].reduce((result, key) => {
      if (!result) {
        result = get(this.state, `${key}Error`)
      }
      return result
    }, false)
  }
  componentWillReceiveProps (props) {
    let prismicCompose = get(props, 'compose') && new PrismicReact(props.compose)
    let composeSubject = (get(this.state, 'subject', prismicCompose && prismicCompose.fragmentToText({fragment: 'composemessage.composesubject'})) || '')
    let composeMessage = (get(this.state, 'template', prismicCompose && prismicCompose.fragmentToText({fragment: 'composemessage.composetext'})) || '').replace('\r\n', '\n')

    this.setState({
      recipients: get(this.state, 'recipients', get(props, 'form.recipients.value')),
      recipientsError: get(this.state, 'recipientsError', get(props, 'form.recipients.error', false)),
      subject: get(this.state, 'subject', get(props, 'form.subject.value')),
      subjectFallback: composeSubject,
      subjectError: get(this.state, 'subjectError', get(props, 'form.subject.error', false)),
      template: get(this.state, 'template', get(props, 'form.template.value')),
      templateFallback: composeMessage,
      templateError: get(this.state, 'templateError', get(props, 'form.template.error', false))
    })
  }
  onBlurRecipients (event) {
    this.setState({
      recipientsError: this.validateRecipients()
    })
  }
  onClickEdit (event) {
    event.preventDefault()
    this.setState(merge({
      editing: !this.state.editing
    }, this.validateEmail()))
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
      template: event.target.value
    })
  }
  chunkify (contents, index) {
    return <span className={this.style.chunk} key={`chunk${index}`}>{contents}</span>
  }
  tagify (contents, ok, index) {
    return <span className={ok ? this.style.tagOk : this.style.tagError} key={`chunk${index}`}>{contents}</span>
  }
  pify (para, index) {
    return <p className={this.style.para} key={`para${index}`}>{para}</p>
  }
  renderMessage (template) {
    return templater.render({
      template: template || get(this.state, 'template', ''),
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
      tagify: this.tagify,
      pify: this.pify,
      chunkify: this.chunkify
    })
  }
  onClickConfirm () {
    this.props.dispatch(postData({
      url: `/jobs/${get(this.props, 'job.slug')}/internal`,
      data: {
        recipients: get(this.state, 'recipients', ''),
        subject: get(this.state, 'subject', get(this.state, 'subjectFallback', '')),
        template: get(this.state, 'template', get(this.state, 'templateFallback', ''))
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
    const tooltip = get(this.props, 'tooltip')
    const invalid = this.isInvalid()
    const recipientsError = get(this.state, 'recipientsError')
    const subjectError = get(this.state, 'subjectError')
    const templateError = get(this.state, 'templateError')
    return (
      <Form className={this.style.pageBody} action={`/jobs/${get(this.props, 'job.slug')}/internal`} method='POST'>
        <input type='hidden' name='_csrf' value={this.props.csrfToken} />
        <PageHeader
          title={<Link className={this.style.jobLink} to={`/jobs/${get(this.props, 'job.slug')}`}>{get(this.props, 'job.title')}</Link>}
          subtitle={<span>@ <Link className={this.style.companyLink} to={'/jobs'}>{get(this.props, 'company.name')}</Link></span>}
        >
          {invalid ? errorLabel(this.style.errorLabel, invalid) : ''}
          <button className={this.style.submit} onClick={this.onClickSend} disabled={get(this.state, 'js') && (this.validateRecipients() || some(values(this.validateEmail()), (value) => !!value))}>Send message</button>
        </PageHeader>
        <h3 className={this.style.pageHeadline}>Now compose your kick-ass message...</h3>
        <div className={this.style.pageContent}>
          <div className={this.style.pageMain}>
            <div className={this.style.recipientsWrap}>
              <label className={this.style.addLabel}>Sending to</label>
              <input className={this.style.recipients} id='recipients' name='recipients' value={get(this.state, 'recipients', '')} onChange={this.onChangeRecipients} onBlur={this.onBlurRecipients} />
              {recipientsError ? errorLabel(this.style.errorLabel, recipientsError) : ''}
            </div>
            <div className={this.style.email}>
              <div className={this.style.subjectWrap}>
                <label className={this.style.addLabel} htmlFor='subject'>Subject</label>
                {get(this.state, 'editing') ? <input className={this.style.subject} type='text' name='subject' value={get(this.state, 'subject', get(this.state, 'subjectFallback', ''))} onChange={this.onChangeSubject} id='subject' /> : <div className={this.style.subject}>{get(this.state, 'subject', get(this.state, 'subjectFallback', ''))}</div>}
                {subjectError ? errorLabel(this.style.errorLabel, subjectError) : ''}
                {get(this.state, 'js') ? <button className={this.style.editing} onClick={this.onClickEdit}>{this.state.editing ? 'Done' : 'Edit'}</button> : ''}
              </div>
              <div className={this.style.templateWrap}>
                <label className={this.style.addLabel} htmlFor='template'>Message</label>
                {get(this.state, 'editing') ? <textarea className={this.style.template} name='template' value={get(this.state, 'template', get(this.state, 'templateFallback', ''))} onChange={this.onChangeMessage} id='template' /> : <div className={this.style.template}> {this.renderMessage(get(this.state, 'template', get(this.state, 'templateFallback', '')))}</div>}
                {templateError ? errorLabel(this.style.errorLabel, templateError) : ''}
              </div>
            </div>
          </div>
          <div className={this.style.pageSidebar}>
            {tooltip ? <Tooltip {...tooltip} /> : ''}
          </div>
        </div>
      </Form>
    )
  }
  render () {
    let page
    switch (true) {
      case get(this.props, 'sending'):
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
