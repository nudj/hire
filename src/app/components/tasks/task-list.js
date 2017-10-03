const React = require('react')
const get = require('lodash/get')

const Task = require('./task')
const getStyle = require('./task-list.css')

const sendSurvey = {
  action: 'Send survey',
  actionLink: '/survey-page',
  text: 'Help jog your team’s memory by sending them this bespoke survey to uncover people for them to ask or hire.',
  title: 'Ask your team for recommendations'
}

const unlockNetwork = {
  action: 'Share connections',
  actionLink: '/import-contacts',
  text: 'Instead of spamming all your LinkedIn connections, we help cherry pick those most likely to help you.',
  title: 'Unlock your LinkedIn connections'
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
  text: 'Time to unlock your memory palace. This survey asks the questions that you might not ask yourself, helping uncover those hidden gems in your own network.',
  title: 'Discover referrers in your network'
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
