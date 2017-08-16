const React = require('react')
const { Link } = require('react-router-dom')
const get = require('lodash/get')

const common = require('./common')
const getStyle = require('./default.css')

module.exports = class TaskSendSurveyInternal extends React.Component {
  constructor (props) {
    super(props)
    this.style = getStyle()
  }

  renderComplete (task) {
    const modified = get(task, 'modified')
    const formattedModified = common.formattedModifiedDate(modified)

    const completedHirer = get(task, 'completed')
    const context = get(this.props, 'context')
    const personName = common.personNameFromHirerId(completedHirer, context)

    return (<li className={this.style.task}>
      <p className={this.style.text}>
        <span className={this.style.textDone}>Send the survey to your team to unlock their networks</span>
        <span className={this.style.completedText}>{personName} completed this task {formattedModified}</span>
      </p>
    </li>)
  }

  renderIncomplete () {
    return (<li className={this.style.task}>
      <p className={this.style.text}>Send the survey to your team to unlock their networks</p>
      <Link className={this.style.action} to='/survey-page'>Action</Link>
    </li>)
  }

  render () {
    const task = get(this.props, 'task')
    const taskCompleted = get(task, 'completed', false)
    return taskCompleted ? this.renderComplete(task) : this.renderIncomplete()
  }
}
