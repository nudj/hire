import React from 'react'
import { Link } from 'react-router-dom'
import style from './500-page.css'

export default (props) => (
  <div className={style.content}>
    <div className={style.gif}>
      <img src='https://media.giphy.com/media/ZeB4HcMpsyDo4/giphy.gif' width='320' height='202' />
    </div>
    <p className={style.header}>Dang-it!</p>
    <p className={style.copy}>That wasn't supposed to happen.</p>
    <small className={style.error}>Error code: 500</small>
    <p className={style.copy}>An error has occurred and we're working to fix the problem! We’ll be up and running again shortly.</p>
    <p classname={style.copy}>If you need immediate help, then please <Link className={style.link} to='' id='open-intercom'>contact us</Link>.</p>
  </div>
)
