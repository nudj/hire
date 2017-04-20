import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import style from './header.css'

const Component = (props) => {
  return (
    <nav className={style.nav}>
      <div className={style.left}>
        <Link className={style.home} to='/'>
          <img className={style.brand} src='/assets/images/nudj-logo.png' />
        </Link>
      </div>
      <div className={style.right}>
        <a href='http://help.nudj.co' className={style.learnMore}>Learn more</a>
        <Link to='/' className={style.link} >Job seeker</Link>
        <Link to='/hiring' className={style.link}>Hirer</Link>
        <Link to='' id='open-intercom' className={style.request}>Get in touch</Link>
      </div>
    </nav>
  )
}

const mapStateToProps = (state, props) => Object.assign({}, state.page, props)
const mapDispatchToProps = (dispatch, ownProps) => ({})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Component))
