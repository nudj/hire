const React = require('react')
const get = require('lodash/get')
const filter = require('lodash/filter')
const some = require('lodash/some')
const escapeHtml = require('escape-html')
const getStyle = require('./compose-page.css')

function tagify (contents, ok) {
  return `<span class="${ok ? this.style.tagOk : this.style.tagError}">${contents}</span>`
}

function stripDelims (tag) {
  return tag.slice(2, -2)
}

function renderTpl (tpl, data) {
  let tags = tpl.match(/\{\{.*?\}\}/g)
  let order = tpl.match(/\{\{.*?\}\}|((?!(\{\{.*?\}\}))[^])+/g)
  return order.map((chunk) => {
    if (tags.includes(chunk)) {
      let result = get(data, stripDelims(chunk))
      return tagify(result !== undefined ? result : escapeHtml(chunk), !!result)
    } else {
      return escapeHtml(chunk)
    }
  }).join('')
}

module.exports = class ComposePage extends React.Component {
  constructor (props) {
    super(props)
    this.style = getStyle()
    this.state = {
      recipients: props.recipients,
      subject: 'Hey, I need your help',
      message: `Hi {{refereeName}},

I hope you don't mind me contacting you.

I'm currently looking for a {{job.title}} to come join us at {{companyName}} and thought you might know someone you've worked with previously who might be interested?

There's a bonus of £{{job.bonus}} available for any successful introduction you make. Just share your unique link below with those you'd recommend and we'll take care of the rest.

{{link}}

Look forward to hearing from you. Thanks so much for your help.

{{personName}}`,
      edit: false
    }
    this.onClickRemove = this.onClickRemove.bind(this)
    this.onClickEdit = this.onClickEdit.bind(this)
    this.onChangeSubject = this.onChangeSubject.bind(this)
    this.onChangeMessage = this.onChangeMessage.bind(this)
    this.renderMessage = this.renderMessage.bind(this)
  }
  onClickRemove (event) {
    this.setState({
      recipients: filter(this.state.recipients, (person) => person.id !== event.target.value)
    })
  }
  onClickEdit (event) {
    event.preventDefault()
    this.setState({
      edit: !this.state.edit
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
  renderMessage () {
    return `<p>${renderTpl(get(this.state, 'message'), {
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
  render () {
    return (
      <form className={this.style.body} action={`/${get(this.props, 'company.slug')}/${get(this.props, 'job.slug')}/send`} method='POST'>
        <input type='hidden' name='_csrf' value={this.props.csrfToken} />
        <header>
          <h1>{get(this.props, 'job.title')}</h1>
          <h2>@ {get(this.props, 'company.name')}</h2>
          <button className={this.style.submit}>Send message</button>
          <button className={this.style.edit} onClick={this.onClickEdit}>{this.state.edit ? 'Done' : 'Edit'}</button>
        </header>
        <h3>Compose message</h3>
        <fieldset>
          <legend>Sending to</legend>
          <ul>
            {get(this.state, 'recipients', []).map((person) => {
              let pid = get(person, 'id')
              return (
                <li key={pid}>
                  <input type='checkbox' name='recipients' value={pid} checked={!!some(this.state.recipients, (person) => person.id === pid)} onChange={this.onClickRemove} id={`recipient-${pid}`} />
                  <label htmlFor={`recipient-${pid}`}>{`${get(person, 'firstName')} ${get(person, 'lastName')}`}</label>
                </li>
              )
            })}
          </ul>
        </fieldset>
        <hr />
        <label className={this.style.addLabel} htmlFor='subject'>Subject line</label>
        {get(this.state, 'edit') ? <input className={this.style.subject} type='text' name='subject' value={get(this.state, 'subject')} onChange={this.onChangeSubject} id='subject' /> : <div className={this.style.subject}>{get(this.state, 'subject')}</div>}
        <hr />
        <label className={this.style.addLabel} htmlFor='message'>Message</label>
        {get(this.state, 'edit') ? <textarea className={this.style.message} name='message' value={get(this.state, 'message')} onChange={this.onChangeMessage} id='message' /> : <div className={this.style.message} dangerouslySetInnerHTML={{ __html: this.renderMessage() }} />}
        <hr />
      </form>
    )
  }
}
