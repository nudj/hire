const React = require('react')
const { Link } = require('react-router-dom')
const getStyle = require('./404-page.css')

const NotFound = (props) => {
  const style = getStyle()
  return (
    <div className={style.content}>
      <img src='https://media.giphy.com/media/k61nOBRRBMxva/giphy.gif' width='320' height='217' />
      <p className={style.header}>Oops!</p>
      <p className={style.copy}>We can't seem to find the page you're looking for.</p>
      <small className={style.error}>Error code: 404</small>
      <p className={style.copy}>Here are some helpful links instead:</p>
      <div className={style.pages}>
        <Link className={style.links} to='/'>Home</Link>
        <Link className={style.links} to='/request'>Request access</Link>
        <Link className={style.links} to='' id='open-intercom'>Contact us</Link>
      </div>
    </div>
  )
}

module.exports = NotFound
