const React = require('react')
const get = require('lodash/get')

const Task = require('./task')
const getStyle = require('./task-list.css')

const TaskList = (props) => {
  const style = getStyle()
  const tasks = get(props, 'tasks', [])
  const person = get(props, 'person')

  return (
    <ul className={style.tasks}>
      {tasks.map(task => <Task key={get(task, 'id')} {...task} person={person} />)}
    </ul>
  )
}

module.exports = TaskList
