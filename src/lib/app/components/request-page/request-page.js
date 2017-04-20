import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import style from './request-page.css'

const Component = (props) => {
  let html
  if (props.success) {
    html = (
      <div className={style.content}>
        <img src='https://media.giphy.com/media/26ufmAlKt4ne2JDnq/giphy.gif' width='320' height='320' />
        <p className={style.successHeader}>Nice one!</p>
        <p className={style.successCopy}>Someone from our team will be in touch shortly.</p>
      </div>
    )
  } else {
    html = (
      <form className={style.content} action='/request' method='post'>
        <input type='hidden' name='_csrf' value={props.csrfToken} />
        <div className={style.formHeader}>
          <h2 className={style.title}>Good things come to those who... nudj</h2>
          <p className={style.subtitle}>Just enter your details below and we'll get back to you as soon as possible.</p>
        </div>
        <fieldset className={style.fieldSet} id='request'>
          <div className={style.fieldWrap}>
            <label className={style.fieldLabel} for='first_name'>First Name</label>
            <input className={style.fieldInput} id='first_name' name='first_name' required type='text' />
          </div>
          <div className={style.fieldWrap}>
            <label className={style.fieldLabel} for='last_name'>Last Name</label>
            <input className={style.fieldInput} id='last_name' name='last_name' required type='text' />
          </div>
          <div className={style.fieldWrap}>
            <label className={style.fieldLabel} for='email_address'>Email</label>
            <input className={style.fieldInput} id='email' name='email' required type='text' />
          </div>
          <div className={style.fieldWrap}>
            <label className={style.fieldLabel} for='company'>Company</label>
            <input className={style.fieldInput} id='company_name' name='company_name' type='text' />
          </div>
        </fieldset>
        <input className={style.fieldSubmit} type='submit' value='Request access' />
      </form>
    )
  }
  return (
    <div className={style.body}>
      {html}
    </div>
  )
}

const mapStateToProps = (state, props) => Object.assign({}, state.page, props)
const mapDispatchToProps = (dispatch, ownProps) => ({})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Component))
