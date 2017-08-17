const React = require('react')
const { Link } = require('react-router-dom')
const get = require('lodash/get')

const common = require('./common')
const getStyle = require('./default.css')

module.exports = class TaskUnlockedNetworkLinkedIn extends React.Component {
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
        <h5 className={this.style.titleDone}>Unlock your network</h5>
        <p className={this.style.textDone}>{personName} completed this task {formattedModified}</p>
      </div>
    </li>)
  }

  renderIncomplete () {
    return (<li className={this.style.task}>
      <div className={this.style.textContainer}>
        <h5 className={this.style.title}>Unlock your network</h5>
        <p className={this.style.text}>Export your connections from LinkedIn so we can highlight who we feel are the best people to ask</p>
      </div>
      <Link className={this.style.action} to='/import-contacts'>Export contacts</Link>
    </li>)
  }

  render () {
    const task = get(this.props, 'task')
    const taskCompleted = get(task, 'completed', false)
    return taskCompleted ? this.renderComplete(task) : this.renderIncomplete()
  }
}
