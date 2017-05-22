const React = require('react')
const get = require('lodash/get')
const getStyle = require('./page-header.css')

const PageHeader = (props) => {
  const style = getStyle()
  return (
    <header className={style.header}>
      <div>
        <h1>{get(props, 'title', '')}</h1>
        <h2>{get(props, 'subtitle', '')}</h2>
      </div>
      <div className={style.sub}>
        {get(props, 'children', '')}
      </div>
    </header>
  )
}

module.exports = PageHeader
