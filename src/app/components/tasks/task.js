const React = require('react')
const Link = require('../link/link')
const get = require('lodash/get')
const { formattedModifiedDate } = require('../../lib')

const getStyle = require('./task.css')

const typeOptions = {
  SEND_SURVEY_INTERNAL: {
    action: 'Send survey',
    actionLink: '/send-survey',
    text: 'Help jog your team’s memory by sending them this bespoke survey to uncover people for them to ask or hire.',
    title: 'Ask your team for recommendations'
  },
  UNLOCK_NETWORK_LINKEDIN: {
    action: 'Share connections',
    actionLink: '/import-contacts',
    text: 'Instead of spamming all your LinkedIn connections, we help cherry pick those most likely to help you.',
    title: 'Unlock your LinkedIn connections'
  },
  SHARE_JOBS: {
    action: 'Share jobs',
    actionLink: '/jobs',
    text: 'We\'ve successfully identified some key people that are likely to give you some great recommendations.',
    title: 'Share your jobs with network'
  },
  HIRER_SURVEY: {
    action: 'Complete survey',
    actionLink: '/surveys/aided-recall-baby',
    text: 'Time to unlock your memory palace. This survey asks the questions that you might not ask yourself, helping uncover those hidden gems in your own network.',
    title: 'Discover referrers in your network'
  }
}

const Task = (props) => {
  const style = getStyle()
  const completed = get(props, 'completed', false)
  const user = get(props, 'user')
  const options = get(typeOptions, props.type)
  const title = get(options, 'title', '')

  let text
  let actions = ''

  if (completed) {
    const modified = get(props, 'modified')
    const completedBy = get(props, 'completedBy')
    const completedDate = formattedModifiedDate(modified)
    let userName = 'You'
    if (completedBy && completedBy.id !== user.id) {
      userName = `${get(completedBy, 'firstName', '')} ${get(completedBy, 'lastName', '')}`
    }

    text = `${userName} completed this task ${completedDate}`
  } else {
    const actionLabel = get(options, 'action', '')
    const actionLink = get(options, 'actionLink', '')

    text = get(options, 'text', '')
    actions = <Link className={style.action} to={actionLink}>{actionLabel}</Link>
  }

  return (
    <div className={style.task}>
      <div className={style.textContainer}>
        <h5 className={style.title}>{title}</h5>
        {text ? <p className={style.text}>{text}</p> : ''}
      </div>
      {actions}
    </div>
  )
}

module.exports = Task
