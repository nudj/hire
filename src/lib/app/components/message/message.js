const React = require('react')
const get = require('lodash/get')
const style = require('./message.css')

module.exports = (props) => {
  return <div className={style.wrapper}>
    {props.message ? <div className={style[get(props, 'message.type')]}>
      <div className={style.copy}>{get(props, 'message.message')}</div>
    </div> : ''}
  </div>
}
