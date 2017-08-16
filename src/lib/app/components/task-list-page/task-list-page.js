const React = require('react')
const { Link } = require('react-router-dom')
const get = require('lodash/get')
const format = require('date-fns/format')
const { Helmet } = require('react-helmet')
const getStyle = require('./task-list-page.css')
const PageHeader = require('../page-header/page-header')
const Plural = require('../plural/plural')
const RowItem = require('../row-item/row-item')
const Tooltip = require('../tooltip/tooltip')
const TaskList = require('../tasks/task-list')

module.exports = class TaskListPage extends React.Component {
  constructor (props) {
    super(props)
    this.style = getStyle()
    const completedVisible = false
    this.state = {completedVisible}
  }

  toggleCompletedVisible (event) {
    event.preventDefault()
    const completedVisible = !get(this.state, 'completedVisible', true)
    this.setState({completedVisible})
  }

  renderCompletedVisible (completeTasks) {
    if (!completeTasks.length) {
      return (<span />)
    }

    const {completedVisible} = this.state

    if (!completedVisible) {
      return (<button onClick={this.toggleCompletedVisible.bind(this)} className={this.style.completedVisibleButton}>Show completed tasks</button>)
    }

    return (<div>
      <h3 className={this.style.taskGroupTitle}>Completed tasks <span className={this.style.taskGroupTitleHighlight}>({completeTasks.length})</span></h3>
      <div className={this.style.pageContent}>
        <div className={this.style.pageMain}>
          <TaskList tasks={completeTasks} />
        </div>
        <div className={this.style.pageSidebar} />
      </div>
      <button onClick={this.toggleCompletedVisible.bind(this)} className={this.style.completedVisibleButton}>Hide completed tasks</button>
    </div>)
  }

  render () {
    const jobs = get(this.props, 'jobs', [])
    const tooltip = get(this.props, 'tooltip')

    const firstName = get(this.props, 'person.firstName', '')

    const completeTasks = get(this.props, 'tasks', []).filter(task => task.completed)
    const incompleteTasks = get(this.props, 'tasks', []).filter(task => !task.completed)

    const completedVisibleContent = this.renderCompletedVisible(completeTasks)

    return (
      <div className={this.style.pageBody}>
        <Helmet>
          <title>{`nudj - Tasks`}</title>
        </Helmet>
        <PageHeader title='Tasks' />
        <h3 className={this.style.pageHeadline}>Welcome, {firstName}! You have {incompleteTasks.length} <Plural singular='task' plural='tasks' count={incompleteTasks.length} /></h3>
        <div className={this.style.pageContent}>
          <div className={this.style.pageMain}>
            <TaskList tasks={incompleteTasks} />
          </div>
          <div className={this.style.pageSidebar}>
            {tooltip ? <Tooltip {...tooltip} /> : ''}
          </div>
        </div>
        {completedVisibleContent}
      </div>
    )
  }
}
