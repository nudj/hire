import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import get from 'lodash/get'
import filter from 'lodash/filter'
import some from 'lodash/some'
import mapValues from 'lodash/mapValues'
import format from 'date-fns/format'
import template from 'string-template'
import style from './compose-page.css'

function tagify (contents) {
  return `<span class="${style.tag}">${contents}</span>`
}

class Component extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      recipients: props.recipients,
      subject: 'Hey, I need your help',
      message: `Hi {refereeName},

I hope you don't mind me contacting you.

I'm currently looking for a {jobTitle} to come join us at {companyName} and thought you might know someone you've worked with previously who might be interested?

There's a bonus of £{jobBonus} available for any successful introduction you make. Just share your unique link below with those you'd recommend and we'll take care of the rest.

{link}

Look forward to hearing from you. Thanks so much for your help.

{personName}`,
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
  renderMessage() {
    return `<p>${template(get(this.state, 'message'), mapValues({
      refereeName: 'First Name',
      jobTitle: get(this.props, 'job.title'),
      companyName: get(this.props, 'company.name'),
      jobBonus: get(this.props, 'job.bonus'),
      link: 'https://nudj.co/company/job',
      personName: `${get(this.props, 'person.firstName')} ${get(this.props, 'person.lastName')}`
    }, tagify)).split('\n').join('</p><p>')}</p>`
  }
  render () {
    return (
      <form className={style.body} action={`/${get(this.props, 'company.slug')}/${get(this.props, 'job.slug')}/send`} method='POST'>
        <input type='hidden' name='_csrf' value={this.props.csrfToken} />
        <header>
          <h1>{get(this.props, 'job.title')}</h1>
          <h2>@ {get(this.props, 'company.name')}</h2>
          <button className={style.submit}>Send message</button>
          <button className={style.edit} onClick={this.onClickEdit}>{this.state.edit ? 'Done' : 'Edit'}</button>
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
        <label className={style.addLabel} htmlFor='subject'>Subject line</label>
        {get(this.state, 'edit') ? <input className={style.subject} type='text' name='subject' value={get(this.state, 'subject')} onChange={this.onChangeSubject} id='subject' /> : <div className={style.subject}>{get(this.state, 'subject')}</div>}
        <hr />
        <label className={style.addLabel} htmlFor='message'>Message</label>
        {get(this.state, 'edit') ? <textarea className={style.message} name='message' value={get(this.state, 'message')} onChange={this.onChangeMessage} id='message' /> : <div className={style.message} dangerouslySetInnerHTML={{ __html: this.renderMessage() }} />}
        <hr />
      </form>
    )
  }
}

const mapStateToProps = (state, props) => Object.assign({}, state.page, props)
const mapDispatchToProps = (dispatch, ownProps) => ({})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Component))
