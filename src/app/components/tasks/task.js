const React = require('react')
const Link = require('../link/link')
const get = require('lodash/get')
const { distanceInWordsToNow, differenceInSeconds } = require('date-fns')

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

function formattedModifiedDate (modified) {
  const difference = differenceInSeconds(new Date(), modified)
  return (difference < 120) ? 'just now' : `${distanceInWordsToNow(modified)} ago`
}

const Task = (props) => {
  const style = getStyle()
  const completed = get(props, 'completed', false)
  const person = get(props, 'person')
  const options = typeOptions[get(props, 'type')]
  const title = get(options, 'title', '')

  let content
  if (completed) {
    const modified = get(props, 'modified')
    const completedBy = get(props, 'completedBy')
    const completedDate = formattedModifiedDate(modified)
    let personName = 'You'

    if (completedBy && completedBy.id !== person.id) {
      personName = `${get(completedBy, 'firstName', '')} ${get(completedBy, 'lastName', '')}`
    }

    content = (
      <li className={style.task}>
        <div className={style.textContainer}>
          <h5 className={style.titleDone}>{title}</h5>
          <p className={style.textDone}>{personName} completed this task {completedDate}</p>
        </div>
      </li>
    )
  } else {
    const text = get(options, 'text', '')
    const actionLabel = get(options, 'action', '')
    const actionLink = get(options, 'actionLink', '')

    content = (
      <li className={style.task}>
        <div className={style.textContainer}>
          <h5 className={style.title}>{title}</h5>
          <p className={style.text}>{text}</p>
        </div>
        <Link className={style.action} to={actionLink}>{actionLabel}</Link>
      </li>
    )
  }

  return content
}

module.exports = Task
