const React = require('react')

const getStyle = require('./style.css')
const Link = require('../link/link')

function onboardedOptions (style, onPageLeave) {
  return [
    <li key='Jobs' className={style.menuItem}><Link onClick={onPageLeave} className={style.jobs} to='/jobs'>Jobs</Link></li>,
    <li key='Connections' className={style.menuItem}><Link onClick={onPageLeave} className={style.jobs} to='/connections'>Connections</Link></li>,
    <li key='Conversations' className={style.menuItem}><Link onClick={onPageLeave} className={style.chat} to='/conversations'>Conversations</Link></li>
  ]
}

const Header = (props) => {
  const {
    onPageLeave,
    incompleteTaskCount,
    onboarded = false
  } = props
  const style = getStyle()

  const tasksLink = (
    <Link className={style.tasks} onClick={onPageLeave} to='/'>
      Tasks{incompleteTaskCount ? <span className={style.alertCount}>{incompleteTaskCount}</span> : ''}
    </Link>
  )

  return (
    <nav className={style.nav}>
      <div className={style.main}>
        <Link className={style.home} onClick={onPageLeave} to='/'>
          <img className={style.brand} src='/assets/images/nudj-logo-light.svg' />
        </Link>
        <ul className={style.menu}>
          <li className={style.menuItem}>{tasksLink}</li>
          {onboarded ? onboardedOptions(style, onPageLeave) : ''}
          <li className={style.menuItem}><a className={style.chat} href='mailto:help@nudj.co' id='open-intercom'>Chat</a></li>
          <li className={style.menuItem}><a onClick={onPageLeave} className={style.help} href='http://help.nudj.co'>Help</a></li>
        </ul>
      </div>
      <div className={style.sub}>
        <ul className={style.menu}>
          <li className={style.menuItem}><a onClick={onPageLeave} className={style.logout} href='/logout'>Log out</a></li>
        </ul>
      </div>
    </nav>
  )
}

module.exports = Header
