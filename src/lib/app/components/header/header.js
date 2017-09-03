const React = require('react')
const get = require('lodash/get')
const getStyle = require('./header.css')
const Link = require('../link/link')

const Header = (props) => {
  const style = getStyle()

  const incompleteTasksCount = get(props, 'tasksIncomplete', []).length
  const tasksLink = incompleteTasksCount ? (<Link className={style.tasks} to='/'>Tasks<span className={style.alertCount}>{incompleteTasksCount}</span></Link>) : (<Link className={style.tasks} to='/'>Tasks</Link>)
  const onboarded = get(props, 'company.onboarded', false)

  return (
    <nav className={style.nav}>
      <div className={style.main}>
        <Link className={style.home} to='/'>
          <img className={style.brand} src='/assets/images/nudj-logo-light.svg' />
        </Link>
        <ul className={style.menu}>
          <li className={style.menuItem}>{tasksLink}</li>
          {onboarded ? <li className={style.menuItem}><Link className={style.jobs} to='/jobs'>Jobs</Link></li> : ''}
          <li className={style.menuItem}><a className={style.help} href='http://help.nudj.co'>Help</a></li>
        </ul>
      </div>
      <div className={style.sub}>
        <ul className={style.menu}>
          <li className={style.menuItem}><a className={style.logout} href='/logout'>Log out</a></li>
        </ul>
      </div>
    </nav>
  )
}

module.exports = Header
