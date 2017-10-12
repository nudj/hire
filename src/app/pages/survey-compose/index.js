const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')
const some = require('lodash/some')
const values = require('lodash/values')
const { merge } = require('@nudj/library')
const actions = require('@nudj/framework/actions')

const getStyle = require('./style.css')
const templater = require('../../lib/templater')
const { emails: validators } = require('../../lib/validators')
const {
  survey: tags,
  getDataBuilderFor
} = require('../../lib/tags')
const LayoutApp = require('../../components/layout-app')
const PageHeader = require('../../components/page-header/page-header')
const Form = require('../../components/form/form')
const Tooltip = require('../../components/tooltip/tooltip')
const ComposeEmail = require('../../components/compose-email/compose-email')

class SurveyPage extends React.Component {
  constructor (props) {
    super(props)
    this.style = getStyle()

    const composeSubject = get(props, 'compose.subject', '')
    const composeMessage = get(props, 'compose.message', '').replace('\r\n', '\n')
    const cleanMessage = this.cleanTemplate(composeMessage)
    let savedRecipients

    if (get(props, 'recipients')) {
      savedRecipients = props.recipients.join(', ')
    }

    this.state = {
      recipients: savedRecipients || get(props, 'form.recipients.value'),
      recipientsError: get(props, 'form.recipients.error', false),
      subject: get(props, 'incompleteSurveyMessage.subject', get(props, 'form.subject.value')),
      subjectFallback: composeSubject,
      subjectError: get(props, 'form.subject.error', false),
      template: get(props, 'incompleteSurveyMessage.message', get(props, 'form.template.value')),
      templateFallback: cleanMessage,
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
    const composeSubject = get(props, 'compose.subject', '')
    const composeMessage = get(props, 'compose.message', '').replace('\r\n', '\n')
    const cleanMessage = this.cleanTemplate(composeMessage)

    this.setState({
      recipients: get(this.state, 'recipients', get(props, 'form.recipients.value')),
      recipientsError: get(this.state, 'recipientsError', get(props, 'form.recipients.error', false)),
      subject: get(this.state, 'subject', get(props, 'form.subject.value')),
      subjectFallback: composeSubject,
      subjectError: get(this.state, 'subjectError', get(props, 'form.subject.error', false)),
      template: get(this.state, 'template', get(props, 'form.template.value')),
      templateFallback: cleanMessage,
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
  // Sub everything except the survey link into plain text
  cleanTemplate (template) {
    const tempTags = merge({}, tags)
    Reflect.deleteProperty(tempTags, 'survey.link')
    return templater.render({
      template: template,
      data: getDataBuilderFor(tempTags, this.props),
      tagify: (content) => content,
      pify: (content) => content.join(''),
      chunkify: (content) => content,
      brify: () => '\n'
    }).join('\n\n')
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
  onClickSend (event) {
    const emailData = (type) => {
      let url = `/send-survey`
      let method = 'post'

      if (get(this.props, 'incompleteSurveyMessage.id')) {
        url = `${url}/${get(this.props, 'incompleteSurveyMessage.id')}`
        method = 'patch'
      }

      return {
        url,
        method,
        data: {
          template: get(this.state, 'template', get(this.state, 'templateFallback', '')),
          subject: get(this.state, 'subject', get(this.state, 'subjectFallback', '')),
          recipients: get(this.state, 'recipients'),
          type
        }
      }
    }
    event.preventDefault()
    if (this.props.googleAuthenticated) {
      return this.props.dispatch(actions.app.postData(emailData('GMAIL')))
    }
    this.props.dispatch(actions.app.showDialog({
      options: [
        {
          type: 'cancel',
          action: {
            name: 'hideDialog'
          }
        },
        {
          title: 'Send via nudj',
          type: 'confirm',
          action: {
            name: 'postData',
            arguments: [emailData('MAILGUN')]
          }
        },
        {
          title: 'Send via Gmail',
          type: 'confirm',
          action: {
            name: 'postData',
            arguments: [emailData('GMAIL')]
          }
        }
      ]
    }))
  }
  render () {
    const title = 'Craft a message to send to your team'
    const subtitle = 'We\'ve created the message below to get you started, but feel free to customise it suit your team - after all you know them best!'
    const tooltip = get(this.props, 'tooltip')
    return (
      <LayoutApp {...this.props} className={this.style.pageBody}>
        <Form method='POST'>
          <Helmet>
            <title>{`nudj - Surveys ${get(this.props, 'company.name')}`}</title>
          </Helmet>
          <input type='hidden' name='_csrf' value={this.props.csrfToken} />
          <PageHeader
            title='Asking your team for recommendations'
            subtitle='On-boarding'
          >
            <button className={this.style.submit} onClick={this.onClickSend} disabled={get(this.state, 'js') && (this.validateRecipients() || some(values(this.validateEmail()), (value) => !!value))}>Send message</button>
          </PageHeader>
          <h3 className={this.style.pageHeadline}>{title}</h3>
          <p className={this.style.copy}>{subtitle}</p>
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
      </LayoutApp>
    )
  }
}

module.exports = SurveyPage
