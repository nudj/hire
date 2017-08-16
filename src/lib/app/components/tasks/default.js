const React = require('react')
const get = require('lodash/get')

const getStyle = require('./default.css')

const TaskDefault = (props) => {
  const style = getStyle()
  const tasks = get(props, 'task')
  return (<li className={style.task}>
    <p className={style.text}>DEFAULT</p>
  </li>)
}

module.exports = TaskDefault
