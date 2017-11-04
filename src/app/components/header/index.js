const React = require('react')
const get = require('lodash/get')
const getStyle = require('./style.css')
const Link = require('../link/link')

const Header = (props) => {
  const style = getStyle()

  const personTasks = get(props, 'person.tasks', [])
  const companyTasks = get(props, 'person.company.tasks', [])
  const allTasks = personTasks.concat(companyTasks)
  const allIncompleteTasks = allTasks.filter(task => !task.completed)
  const incompleteTasksCount = allIncompleteTasks.length
  const tasksLink = incompleteTasksCount ? (<Link className={style.tasks} onClick={props.onPageLeave} to='/'>Tasks<span className={style.alertCount}>{incompleteTasksCount}</span></Link>) : (<Link className={style.tasks} to='/'>Tasks</Link>)
  const onboarded = get(props, 'person.company.onboarded', false)

  return (
    <nav className={style.nav}>
      <div className={style.main}>
        <Link className={style.home} onClick={props.onPageLeave} to='/'>
          <img className={style.brand} src='/assets/images/nudj-logo-light.svg' />
        </Link>
        <ul className={style.menu}>
          <li className={style.menuItem}>{tasksLink}</li>
          {onboarded ? <li className={style.menuItem}><Link onClick={props.onPageLeave} className={style.jobs} to='/jobs'>Jobs</Link></li> : ''}
          <li className={style.menuItem}><a className={style.chat} href='mailto:help@nudj.co' id='open-intercom'>Chat</a></li>
          <li className={style.menuItem}><a onClick={props.onPageLeave} className={style.help} href='http://help.nudj.co'>Help</a></li>
        </ul>
      </div>
      <div className={style.sub}>
        <ul className={style.menu}>
          <li className={style.menuItem}><a onClick={props.onPageLeave} className={style.logout} href='/logout'>Log out</a></li>
        </ul>
      </div>
    </nav>
  )
}

module.exports = Header
