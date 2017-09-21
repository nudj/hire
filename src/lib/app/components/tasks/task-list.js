const React = require('react')
const get = require('lodash/get')

const Task = require('./task')
const getStyle = require('./task-list.css')

const sendSurvey = {
  action: 'Send survey',
  actionLink: '/survey-page',
  text: 'Send our bespoke survey to your team to help them discover people worth asking in their networks.',
  title: 'Ask your team for recommendations'
}

const unlockNetwork = {
  action: 'Export contacts',
  actionLink: '/import-contacts',
  text: 'Export your connections from LinkedIn so we can highlight who we feel are the best people to ask.',
  title: 'Unlock your network'
}

const shareJobs = {
  action: 'Share jobs',
  actionLink: '/jobs',
  text: 'We\'ve successfully identified some key people that are likely to give you some great recommendations.',
  title: 'Share your jobs with network'
}

const hirerSurvey = {
  action: 'Complete survey',
  actionLink: '/hirer-survey',
  text: 'Complete our bespoke survey to help you discover people worth asking in their networks.',
  title: 'Survey?'
}

function renderTask (task, context) {
  const key = get(task, 'id', '')
  const type = get(task, 'type', '')

  let content = {}

  switch (type) {
    case 'SEND_SURVEY_INTERNAL':
      content = sendSurvey
      break
    case 'UNLOCK_NETWORK_LINKEDIN':
      content = unlockNetwork
      break
    case 'SHARE_JOBS':
      content = shareJobs
      break
    case 'HIRER_SURVEY':
      content = hirerSurvey
      break
    default:
  }

  return (<Task task={task} context={context} key={key} content={content} />)
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
