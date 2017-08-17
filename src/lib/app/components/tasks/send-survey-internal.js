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
      <div className={this.style.textContainer}>
        <h5 className={this.style.titleDone}>Ask your team for recommendations</h5>
        <p className={this.style.textDone}>{personName} completed this task {formattedModified}</p>
      </div>
    </li>)
  }

  renderIncomplete () {
    return (<li className={this.style.task}>
      <div className={this.style.textContainer}>
        <h5 className={this.style.title}>Ask your team for recommendations</h5>
        <p className={this.style.text}>Send our bespoke survey to your team to help them discover people worth asking in their networks</p>
      </div>
      <Link className={this.style.action} to='/survey-page'>Send survey</Link>
    </li>)
  }

  render () {
    const task = get(this.props, 'task')
    const taskCompleted = get(task, 'completed', false)
    return taskCompleted ? this.renderComplete(task) : this.renderIncomplete()
  }
}
