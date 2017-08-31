const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')
const some = require('lodash/some')
const values = require('lodash/values')
const getStyle = require('./survey-page.css')
const PageHeader = require('../page-header/page-header')
const PrismicReact = require('../../lib/prismic-react')
const templater = require('../../../lib/templater')
const { merge } = require('@nudj/library')
const Form = require('../form/form')
const DialogConfirm = require('../dialog-confirm-send-internal/dialog-confirm-send-internal')
const Tooltip = require('../tooltip/tooltip')
const ComposeEmail = require('../compose-email/compose-email')
const {
  showDialog,
  hideDialog,
  postData,
  showLoading
} = require('../../actions/app')
const { emails: validators } = require('../../../lib/validators')
const {
  survey: tags,
  getDataBuilderFor
} = require('../../../lib/tags')

module.exports = class SurveyPage extends React.Component {
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
      editing: true
    }
    this.validateRecipients = this.validateRecipients.bind(this)
    this.validateEmail = this.validateEmail.bind(this)
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
    const options = {
      permittedTags: Object.keys(tags)
    }
    return ['subject', 'template'].reduce((newState, key) => {
      let value = get(this.state, key, get(this.state, `${key}Fallback`))
      newState[`${key}Error`] = validators[key](value, options)
      return newState
    }, {})
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
  pify (para, index, margin = 0) {
    return <p className={this.style.para} style={{ marginTop: `${1.5 * margin}rem` }} key={`para${index}`}>{para}</p>
  }
  renderMessage (template) {
    return templater.render({
      template: template || get(this.state, 'template', ''),
      data: getDataBuilderFor(tags, this.props),
      tagify: this.tagify,
      pify: this.pify,
      chunkify: this.chunkify,
      brify: (index) => <br key={`br${index}`} />
    })
  }
  onClickConfirm () {
    this.props.dispatch(showLoading())
    this.props.dispatch(postData({
      url: `/survey-page`,
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
  render () {
    const tooltip = get(this.props, 'tooltip')
    return (
      <Form className={this.style.pageBody} method='POST'>
        <Helmet>
          <title>{`nudj - Surveys ${get(this.props, 'company.name')}`}</title>
        </Helmet>
        <input type='hidden' name='_csrf' value={this.props.csrfToken} />
        <PageHeader
          title='Ask your team for recommendations'
          subtitle='Send survey'
        >
          <button className={this.style.submit} onClick={this.onClickSend} disabled={get(this.state, 'js') && (this.validateRecipients() || some(values(this.validateEmail()), (value) => !!value))}>Send message</button>
        </PageHeader>
        <h3 className={this.style.pageHeadline}>Compose your message</h3>
        <div className={this.style.pageContent}>
          <div className={this.style.pageMain}>
            <ComposeEmail
              recipients={get(this.state, 'recipients')}
              recipientsError={get(this.state, 'recipientsError')}
              subject={get(this.state, 'subject')}
              subjectError={get(this.state, 'subjectError')}
              js={get(this.state, 'js')}
              editing={get(this.state, 'editing')}
              templateFallback={get(this.state, 'templateFallback')}
              template={get(this.state, 'template')}
              templateError={get(this.state, 'templateError')}
              subjectFallback={get(this.state, 'subjectFallback')}
              onChangeRecipients={this.onChangeRecipients}
              onBlurRecipients={this.onBlurRecipients}
              onClickEdit={this.onClickEdit}
              onChangeMessage={this.onChangeMessage}
              renderMessage={this.renderMessage}
              onChangeSubject={this.onChangeSubject}
            />
          </div>
          <div className={this.style.pageSidebar}>
            {tooltip ? <Tooltip {...tooltip} /> : ''}
          </div>
        </div>
      </Form>
    )
  }
}
