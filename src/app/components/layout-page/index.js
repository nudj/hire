const React = require('react')
const get = require('lodash/get')

const getStyle = require('./style.css')
const LayoutApp = require('../layout-app')
const PageHeader = require('../page-header/page-header')
const Tooltip = require('../tooltip/tooltip')

const LayoutPage = (props) => {
  const style = getStyle()
  const {
    tooltip,
    header,
    headline,
    user,
    history,
    dispatch,
    overlay,
    dialog,
    onPageLeave,
    notification,
    children
  } = props

  return (
    <LayoutApp
      className={style.pageBody}
      incompleteTaskCount={get(user, 'incompleteTaskCount')}
      companyOnboardedEvent={get(user, 'hirer.company.onboarded')}
      history={history}
      dispatch={dispatch}
      overlay={overlay}
      dialog={dialog}
      onPageLeave={onPageLeave}
      notification={notification}
    >
      <PageHeader {...header} />
      {headline ? <h3 className={style.pageHeadline}>{headline}</h3> : ''}
      <div className={style.pageContent}>
        <div className={style.pageMain}>
          {children}
        </div>
        <div className={style.pageSidebar}>
          {tooltip ? <Tooltip {...tooltip} /> : ''}
        </div>
      </div>
    </LayoutApp>
  )
}

module.exports = LayoutPage
