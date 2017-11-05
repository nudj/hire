const React = require('react')
const _get = require('lodash/get')

const getStyle = require('./style.css')
const LayoutApp = require('../layout-app')
const PageHeader = require('../page-header/page-header')
const Tooltip = require('../tooltip/tooltip')

const LayoutPage = (props) => {
  const style = getStyle()
  const tooltip = _get(props, 'tooltip')
  const header = _get(props, 'header')
  const headline = _get(props, 'headline')

  return (
    <LayoutApp {...props} className={style.pageBody}>
      <PageHeader {...header} />
      {headline ? <h3 className={style.pageHeadline}>{headline}</h3> : ''}
      <div className={style.pageContent}>
        <div className={style.pageMain}>
          {props.children}
        </div>
        <div className={style.pageSidebar}>
          {tooltip ? <Tooltip {...tooltip} /> : ''}
        </div>
      </div>
    </LayoutApp>
  )
}

module.exports = LayoutPage
