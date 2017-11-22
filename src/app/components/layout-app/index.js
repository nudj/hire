const React = require('react')

const getStyle = require('./style.css')
const Header = require('../header')
const Notification = require('../notification')
const Overlay = require('../overlay')
const ScrollTop = require('../scroll-top')

const LayoutApp = (props) => {
  const style = getStyle()
  const {
    incompleteTaskCount,
    companyOnboardedEvent = false,
    history,
    className,
    dispatch,
    overlay,
    dialog,
    onPageLeave,
    notification,
    children
  } = props

  return (
    <ScrollTop ignore={history.action === 'REPLACE'}>
      <div className={`${className} ${style.body}`}>
        <Notification notification={notification} dispatch={dispatch} />
        <Overlay overlay={overlay} dialog={dialog} dispatch={dispatch} />
        <header className={style.header}>
          <Header onPageLeave={onPageLeave} incompleteTaskCount={incompleteTaskCount} onboarded={companyOnboardedEvent} />
        </header>
        <div className={style.content}>
          {children}
        </div>
      </div>
    </ScrollTop>
  )
}

module.exports = LayoutApp
