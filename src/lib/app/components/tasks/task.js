const React = require('react')
const { Link } = require('react-router-dom')
const get = require('lodash/get')
const { distanceInWordsToNow, differenceInSeconds } = require('date-fns')

const getStyle = require('./task.css')

module.exports = class Task extends React.Component {
  constructor (props) {
    super(props)
    this.style = getStyle()
  }

  formattedModifiedDate (modified) {
    const difference = differenceInSeconds(new Date(), modified)
    return (difference < 120) ? 'just now' : `${distanceInWordsToNow(modified)} ago`
  }

  personNameFromHirerId (hirerId) {
    const context = get(this.props, 'context')
    const hirers = get(context, 'hirers', [])
    const people = get(context, 'people', [])
    const you = get(context, 'person.id')

    const hirer = hirers.find(hirer => hirer.id === hirerId)
    const person = people.find(person => person.id === hirer.person)

    const personName = get(person, 'id') === you ? 'You' : `${get(person, 'firstName', '')} ${get(person, 'lastName', '')}`
    return personName
  }

  renderComplete (task) {
    const modified = get(task, 'modified')
    const formattedModified = this.formattedModifiedDate(modified)

    const completedHirer = get(task, 'completed')
    const personName = this.personNameFromHirerId(completedHirer)

    const title = get(this.props, 'content.title', '')

    return (<li className={this.style.task}>
      <div className={this.style.textContainer}>
        <h5 className={this.style.titleDone}>{title}</h5>
        <p className={this.style.textDone}>{personName} completed this task {formattedModified}</p>
      </div>
    </li>)
  }

  renderIncomplete () {
    const actionLabel = get(this.props, 'content.action', '')
    const actionLink = get(this.props, 'content.actionLink', '')
    const text = get(this.props, 'content.text', '')
    const title = get(this.props, 'content.title', '')

    return (<li className={this.style.task}>
      <div className={this.style.textContainer}>
        <h5 className={this.style.title}>{title}</h5>
        <p className={this.style.text}>{text}</p>
      </div>
      <Link className={this.style.action} to={actionLink}>{actionLabel}</Link>
    </li>)
  }

  render () {
    const task = get(this.props, 'task')
    const taskCompleted = get(task, 'completed', false)
    return taskCompleted ? this.renderComplete(task) : this.renderIncomplete()
  }
}
