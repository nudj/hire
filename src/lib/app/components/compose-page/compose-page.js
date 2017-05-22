const React = require('react')
const { Link } = require('react-router-dom')
const get = require('lodash/get')
// const filter = require('lodash/filter')
// const some = require('lodash/some')
const escapeHtml = require('escape-html')
const getStyle = require('./compose-page.css')
const PageHeader = require('../page-header/page-header')
const PrismicReact = require('../../lib/prismic-react')
const Form = require('../form/form')
const DialogConfirm = require('../dialog-confirm-send-internal/dialog-confirm-send-internal')
const {
  showDialog,
  hideDialog,
  postData
} = require('../../actions/app')

const stripDelims = (tag) => tag.slice(2, -2)

// <ul>
//   {get(this.state, 'recipients', []).map((person) => {
//     let pid = get(person, 'id')
//     return (
//       <li key={pid}>
//         <input type='checkbox' name='recipients' value={pid} checked={!!some(this.state.recipients, (person) => person.id === pid)} onChange={this.onClickRemove} id={`recipient-${pid}`} />
//         <label htmlFor={`recipient-${pid}`}>{`${get(person, 'firstName')} ${get(person, 'lastName')}`}</label>
//       </li>
//     )
//   })}
// </ul>

module.exports = class ComposePage extends React.Component {
  constructor (props) {
    super(props)
    this.style = getStyle()
    const prismicCompose = new PrismicReact(props.compose)
    const composeSubject = prismicCompose.fragmentToText({fragment: 'composemessage.composesubject'})
    const composeMessage = prismicCompose.fragmentToText({fragment: 'composemessage.composetext'})

    this.state = {
      recipients: '',
      subject: composeSubject,
      message: composeMessage,
      edit: false
    }
    // this.onClickRemove = this.onClickRemove.bind(this)
    this.onClickEdit = this.onClickEdit.bind(this)
    this.onChangeRecipients = this.onChangeRecipients.bind(this)
    this.onChangeSubject = this.onChangeSubject.bind(this)
    this.onChangeMessage = this.onChangeMessage.bind(this)
    this.renderMessage = this.renderMessage.bind(this)
    this.tagify = this.tagify.bind(this)
    this.renderTpl = this.renderTpl.bind(this)
    this.onClickSend = this.onClickSend.bind(this)
    this.onClickConfirm = this.onClickConfirm.bind(this)
    this.onClickCancel = this.onClickCancel.bind(this)
  }
  // onClickRemove (event) {
  //   this.setState({
  //     recipients: filter(this.state.recipients, (person) => person.id !== event.target.value)
  //   })
  // }
  onClickEdit (event) {
    event.preventDefault()
    this.setState({
      edit: !this.state.edit
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
  renderTpl (tpl, data) {
    let tags = tpl.match(/\{\{.*?\}\}/g)
    let order = tpl.match(/\{\{.*?\}\}|((?!(\{\{.*?\}\}))[^])+/g)
    return order.map((chunk) => {
      if (tags.includes(chunk)) {
        let result = get(data, stripDelims(chunk))
        return this.tagify(result !== undefined ? result : escapeHtml(chunk), !!result)
      } else {
        return escapeHtml(chunk)
      }
    }).join('')
  }
  renderMessage () {
    return `<p>${this.renderTpl(get(this.state, 'message'), {
      refereeName: 'First Name',
      job: {
        title: get(this.props, 'job.title'),
        bonus: get(this.props, 'job.bonus')
      },
      companyName: get(this.props, 'company.name'),
      link: 'https://nudj.co/company/job',
      personName: `${get(this.props, 'person.firstName')} ${get(this.props, 'person.lastName')}`
    }).replace(/(.)\n{2}(.)/g, '$1</p><p>$2').replace(/(.)\n{2}/g, '$1</p>\n').replace(/\n{2}(.)/g, '\n<p>$1').replace(/\n/g, '<br />')}</p>`
  }
  onClickConfirm () {
    this.props.dispatch(postData({
      url: `/jobs/${get(this.props, 'job.slug')}/internal/send`,
      data: {
        recipients: this.state.recipients,
        subject: this.state.subject,
        message: this.state.message
      }
    }))
  }
  onClickCancel () {
    this.props.dispatch(hideDialog())
  }
  onClickSend (event) {
    event.preventDefault()
    this.props.dispatch(showDialog(<DialogConfirm {...this.props} onClickConfirm={this.onClickConfirm} onClickCancel={this.onClickCancel} />))
  }
  render () {
    return (
      <Form className={this.style.pageBody} action={`/jobs/${get(this.props, 'job.slug')}/internal/send`} method='POST'>
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
              <input className={this.style.recipients} id='recipients' name='recipients' value={get(this.state, 'recipients')} onChange={this.onChangeRecipients} />
            </div>
            <div className={this.style.email}>
              <div className={this.style.subjectWrap}>
                <label className={this.style.addLabel} htmlFor='subject'>Subject</label>
                {get(this.state, 'edit') ? <input className={this.style.subject} type='text' name='subject' value={get(this.state, 'subject')} onChange={this.onChangeSubject} id='subject' /> : <div className={this.style.subject}>{get(this.state, 'subject')}</div>}
                <button className={this.style.edit} onClick={this.onClickEdit}>{this.state.edit ? 'Done' : 'Edit'}</button>
              </div>
              <div className={this.style.messageWrap}>
                <label className={this.style.addLabel} htmlFor='message'>Message</label>
                {get(this.state, 'edit') ? <textarea className={this.style.message} name='message' value={get(this.state, 'message')} onChange={this.onChangeMessage} id='message' /> : <div className={this.style.message} dangerouslySetInnerHTML={{ __html: this.renderMessage() }} />}
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
}
