const React = require('react')

const getStyle = require('./loading.css')
const LayoutApp = require('../layout-app')
const PageHeader = require('../page-header/page-header')

const Loading = (props) => {
  const style = getStyle()
  return <LayoutApp {...props} className={style.loading}>
    <PageHeader />
    <div className={style.body}>
      <div className={style.spinner} />
    </div>
  </LayoutApp>
}

module.exports = Loading
