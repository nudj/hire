const React = require('react')
const get = require('lodash/get')

const getStyle = require('./style.css')
const Header = require('../header')
const Notification = require('../notification')
const Overlay = require('../overlay')
const ScrollTop = require('../scroll-top')

const LayoutApp = (props) => {
  const style = getStyle()
  const incompleteTaskCount = get(props, 'person.incompleteTaskCount')
  const onboarded = get(props, 'company.onboarded', false)

  return (
    <ScrollTop ignore={props.history.action === 'REPLACE'}>
      <div className={`${props.className} ${style.body}`}>
        <Notification notification={props.notification} dispatch={props.dispatch} />
        <Overlay overlay={props.overlay} dialog={props.dialog} dispatch={props.dispatch} />
        <header className={style.header}>
          <Header onPageLeave={props.onPageLeave} incompleteTaskCount={incompleteTaskCount} onboarded={onboarded} />
        </header>
        <div className={style.content}>
          {props.children}
        </div>
      </div>
    </ScrollTop>
  )
}

module.exports = LayoutApp
