const React = require('react')
const get = require('lodash/get')
const getStyle = require('./page-header.css')

const PageHeader = (props) => {
  const style = getStyle()

  return (
    <header className={props.fixed ? style.fixedHeader : style.header}>
      <div className={style.main}>
        <h1 className={style.title}>{get(props, 'title', '')}</h1>
        <h2 className={style.subtitle}>{get(props, 'subtitle', '')}</h2>
      </div>
      <div className={props.fixed ? style.fixedSub : style.sub}>
        {get(props, 'children', '')}
      </div>
    </header>
  )
}

module.exports = PageHeader
