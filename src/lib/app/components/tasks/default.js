const React = require('react')
const get = require('lodash/get')

const getStyle = require('./default.css')

const TaskDefault = (props) => {
  const style = getStyle()
  const task = get(props, 'task')
  const type = get(task, 'type')
  return (<li className={style.task}>
    <div className={style.textContainer}>
      <p className={style.text}>{type}</p>
    </div>
  </li>)
}

module.exports = TaskDefault
