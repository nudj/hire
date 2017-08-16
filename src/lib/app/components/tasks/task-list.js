const React = require('react')
const get = require('lodash/get')

const RowItem = require('../row-item/row-item')

const TaskDefault = require('./default')
const TaskSendSurveyInternal = require('./send-survey-internal')
const TaskUnlockedNetworkLinkedIn = require('./unlock-network-linkedin')

const getStyle = require('./task-list.css')

function renderTask (task) {
  const completed = get(task, 'completed', false)
  const key = get(task, 'id', '')
  const type = get(task, 'type', '')

  switch(type) {
    case 'SEND_SURVEY_INTERNAL':
      return <TaskSendSurveyInternal task={task} />
      break;
    case 'UNLOCK_NETWORK_LINKEDIN':
      return <TaskUnlockedNetworkLinkedIn task={task} />
      break;
    default:
      return <TaskDefault task={task} />
  }
}

const TaskList = (props) => {
  const style = getStyle()
  const tasks = get(props, 'tasks', [])

  const list = tasks.map(task => renderTask(task))

  return (<ul className={style.tasks}>
    {list}
  </ul>)
}

module.exports = TaskList
