const React = require('react')
const get = require('lodash/get')

const TaskDefault = require('./default')
const TaskSendSurveyInternal = require('./send-survey-internal')
const TaskUnlockedNetworkLinkedIn = require('./unlock-network-linkedin')

const getStyle = require('./task-list.css')

function renderTask (task, context) {
  const key = get(task, 'id', '')
  const type = get(task, 'type', '')

  switch (type) {
    case 'SEND_SURVEY_INTERNAL':
      return <TaskSendSurveyInternal task={task} context={context} key={key} />
    case 'UNLOCK_NETWORK_LINKEDIN':
      return <TaskUnlockedNetworkLinkedIn task={task} context={context} key={key} />
    default:
      return <TaskDefault task={task} context={context} key={key} />
  }
}

const TaskList = (props) => {
  const style = getStyle()
  const tasks = get(props, 'tasks', [])

  const hirers = get(props, 'hirers', [])
  const people = get(props, 'people', [])
  const person = get(props, 'person')

  const context = {hirers, people, person}

  const list = tasks.map(task => renderTask(task, context))

  return (<ul className={style.tasks}>
    {list}
  </ul>)
}

module.exports = TaskList
