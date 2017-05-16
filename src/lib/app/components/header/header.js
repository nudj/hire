const React = require('react')
const { Link } = require('react-router-dom')
const style = require('./header.css')

module.exports = (props) => {
  return (
    <nav className={style.nav}>
      <div className={style.main}>
        <Link className={style.home} to='/'>
          <img className={style.brand} src='/assets/images/nudj-logo-light.svg' />
        </Link>
        <ul className={style.menu}>
          <li className={style.menuItem}><Link className={style.jobs} to={'/jobs'}>Jobs</Link></li>
          <li className={style.menuItem}><Link className={style.candidates} to={'/candidates'}>Candidates</Link></li>
          <li className={style.menuItem}><a className={style.help} href='http://help.nudj.co'>Help</a></li>
        </ul>
      </div>
      <div className={style.sub}>
        <Link className={style.logout} to={'/logout'}>Log out</Link>
      </div>
    </nav>
  )
}
