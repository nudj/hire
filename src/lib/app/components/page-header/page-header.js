const React = require('react')
const get = require('lodash/get')
const style = require('./page-header.css')

module.exports = (props) => (
  <header className={style.header}>
    <div>
      <h1>{get(props, 'title', '')}</h1>
      <h2>@ {get(props, 'subtitle', '')}</h2>
    </div>
    <div className={style.sub}>
      {get(props, 'children', '')}
    </div>
  </header>
)
