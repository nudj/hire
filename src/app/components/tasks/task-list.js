const React = require('react')
const get = require('lodash/get')

const Task = require('./task')
const getStyle = require('./task-list.css')

const TaskList = (props) => {
  const style = getStyle()
  const tasks = get(props, 'tasks', [])
  const user = get(props, 'user')

  return (
    <ul className={style.tasks}>
      {tasks.map(task => (
        <li key={get(task, 'id')} className={style.task}>
          <Task {...task} user={user} />
        </li>
      ))}
    </ul>
  )
}

module.exports = TaskList
